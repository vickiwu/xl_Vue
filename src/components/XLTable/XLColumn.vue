<template>

  <!-- component -->
  <component :is="col.component" v-if="col.component" :key="index" :col="col" />

  <el-table-column
    v-else
    :prop="col.prop"
    :label="col.label"
    :align="col.align"
    :header-align="col.headerAlign || col.align"
    :sortable="col.sortable"
    :width="col.width ? '-' : col.width"
    :min-width="col.minWidth || col.width"
    :fixed="col.fixed"
    :render-header="col.renderHeader"
    :sort-by="col.sortBy"
    :sort-method="col.method"
    :resizable="col.resizable"
    :formatter="col.formatter"
    :show-overflow-tooltip="col.showOverflowTooltip"
    :class-name="col.className"
    :label-class-name="col.labelClassName"
    :selectable="col.selectable"
    :reserve-selection="col.reserveSelection"
    :filters="col.filters"
    :filter-placement="col.filterPlacement"
    :filter-multiple="col.filterMultiple"
    :filter-method="col.filterMethod"
    :filtered-value="col.filteredValue"
  >
    <template slot-scope="scope">
      <render-dom v-if="col.render" :row="scope.row" :index="scope.$index" :render="col.render" />
      <span v-else-if="col.formatter">
        {{ col.formatter(scope.row, scope.col, scope.row[col.prop], scope.$index) }}
      </span>
      <span v-else-if="col.slotName">
        <slot :name="col.slotName" :row="scope.row" :$index="scope.$index" />
      </span>
      <span v-else>
        {{ scope.row[col.prop] }}
      </span>
      <template v-for="(btn, idx) in col.buttonGroups">
        <el-button
          :key="idx"
          :type="btn.type"
          :size="btn.size || 'mini'"
          :icon="btn.icon"
          :class="btn.class"
          :disabled="btn.disabled"
          :plain="btn.plain"
          @click.stop="btn.click(scope.row, scope.$index)"
        >{{ btn.name }}</el-button>
      </template>
    </template>
    <template v-if="col.children">
      <XLColumn v-for="(item,index) in col.children" :key="index" :col="item" />
    </template>
  </el-table-column>
</template>

<script>
import props from './props'

export default {
  name: 'XLColumn',
  components: {
    // 函数式组件
    // https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6
    renderDom: {
      functional: true,	// 无状态 (没有响应式数据)，无实例 (没有 this 上下文)

      props: {
        row: Object,
        index: Number,
        render: Function
      },

      /**
				 * @param { Function } createElement - 原生创建dom元素的方法
				 * @param { Object } content - 渲染的节点的 this 对象(参数作为上下文)
				 * @returns 传递参数 row index
				 */
      render(createElement, content) {
        const { row, index } = content.props
        return content.props.render(row, index)
      }
    }
  },
  props: {
    ...props,
    col: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>

</style>
