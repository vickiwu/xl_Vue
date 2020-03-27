<template>
  <el-select
    :value="multiple ? valueTitles: valueTitle"
    :clearable="clearable"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    @clear="clearHandle"
    @remove-tag="remove"
  >
    <el-option
      :value="valueTitle"
      :label="valueTitle"
    >
      <el-tree
        ref="selectTree"
        :accordion="accordion"
        :data="data"
        :props="props"
        :show-checkbox="multiple"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        @node-click="handleNodeClick"
        @check="handleNodeCheck"
      />
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    // 配置选项
    props: {
      type: Object,
      default: function() {
        return {
          value: 'id', // ID字段名
          label: 'title', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },
    // 展示数据
    data: {
      type: Array,
      default: () => []
    },
    // 初始值
    value: {
      type: Number,
      default: null
    },
    // 初始值 复选
    values: {
      type: Array,
      default: () => []
    },
    // 可清空选项
    clearable: {
      type: Boolean,
      default: true
    },
    // 是否每次只打开一个同级树节点展开
    accordion: {
      type: Boolean,
      default: false
    },
    // 复选
    multiple: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valueId: '', // 单选时组件的值
      valueIds: [], // 复选时组件的值
      valueTitle: null, // 单选时下拉框展示的值
      valueTitles: [], // 复选时下拉框展示的值
      defaultExpandedKey: [] // 默认展开的节点的 key 的数组
    }
  },
  watch: {
    value() {
      this.valueId = this.value
      this.valueIds = this.values
      this.initHandle()
    }
  },
  mounted() {
    this.valueId = this.value
    this.valueIds = this.values
    this.initHandle()
  },
  methods: {
    // 初始化值
    initHandle() {
      if (!this.multiple) {
        // 单选
        if (this.valueId) {
          this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.props.label]
          this.$refs.selectTree.setCurrentKey(this.valueId) // 设置默认选中
          this.defaultExpandedKey = this.valueId
        }
      } else {
        // 开启复选
        if (this.valueIds.length > 0) {
          this.valueIds.map(item => [...this.valueTitles, this.$refs.selectTree.getNode(item).data[this.props.label]])
          this.valueIds.map(item => this.$refs.selectTree.setCurrentKey(item)) // 设置默认选中
          this.defaultExpandedKey = this.valueIds
        }
      }
      this.initScroll()
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        const scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach(ele => (ele.style.width = 0))
      })
    },
    // 切换选项
    handleNodeClick(node) {
      // 单选
      if (!this.multiple) {
        this.valueTitle = node[this.props.label]
        this.valueId = node[this.props.value]
        this.$emit('getValue', this.valueId)
      } else {
        let keys = this.$refs.selectTree.getCheckedKeys()
        // 设置keys
        const clickKey = node[this.props.value]
        if (keys.includes(clickKey)) {
          keys = keys.filter(item => item !== clickKey)
        } else {
          keys = [...keys, clickKey]
        }
        this.$refs.selectTree.setCheckedKeys(keys)
        this.$emit('getValue', keys)
        // 设置titles
        const clickTitle = node[this.props.label]
        if (this.valueTitles.includes(clickTitle)) {
          this.valueTitles = this.valueTitles.filter(item => item !== clickTitle)
        } else {
          this.valueTitles = [...this.valueTitles, clickTitle]
        }
      }
      this.defaultExpandedKey = []
    },
    // 复选时节点被选中
    handleNodeCheck(node) {
      const keys = this.$refs.selectTree.getCheckedKeys()
      const nodes = this.$refs.selectTree.getCheckedNodes()
      const nodes1 = nodes.filter(node => this.hasNoParent(node['parentId'], nodes))

      const array = []
      for (let i = 0; i < nodes1.length; i++) {
        const node = nodes1[i]
        array.push(node[this.props.label])
      }
      this.valueTitles = array
      this.$emit('getValue', keys)
    },
    hasNoParent(id, nodes) {
      const filter = nodes.filter(node => node[this.props.value] === id)
      return filter.length === 0
    },
    remove(title) {
      let nodes = this.$refs.selectTree.getCheckedNodes()

      const nodesFilter = nodes.filter(node => node[this.props.label] === title)
      if (nodesFilter.length > 0) {
        const delNode = nodesFilter[0]
        nodes = nodes.filter(node => !this.isInDelNode(node, delNode))
        this.$refs.selectTree.setCheckedNodes(nodes)
      }

      this.valueTitles = this.valueTitles.filter(item => item !== title)
      this.$emit('getValue', this.$refs.selectTree.getCheckedKeys())
    },
    isInDelNode(node, delNode) {
      let flag = false
      if (node[this.props.value] === delNode[this.props.value]) {
        flag = true
      } else {
        const children = delNode.children
        if (children && children.length > 0) {
          for (let i = 0; i < children.length; i++) {
            const item = children[i]
            if (item[this.props.value] === node[this.props.value]) {
              flag = true
              return flag
            } else {
              flag = this.isInDelNode(node, item)
              if (flag) {
                return flag
              }
            }
          }
        }
      }
      return flag
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = ''
      this.valueId = null
      this.defaultExpandedKey = []
      this.valueTitles = []
      this.valueIds = []
      this.$refs.selectTree.setCheckedKeys([])
      this.clearSelected()
      this.$emit('getValue', null)
    },
    // 清空选中样式
    clearSelected() {
      const allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    }
  }
}
</script>

<style scoped>
 .el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
</style>
