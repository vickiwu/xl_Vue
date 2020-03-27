<template>
  <el-form ref="form" :model="form" :inline="true" label-position="right" label-width="80px">
    <span v-for="(item, index) in list" :key="index">
      <!-- 输入框 -->
      <el-form-item v-if="item.type === 'input'&& item.dataType !== 'number'" :label="item.label">
        <el-input v-model="form[item.field]" :type="item.dataType" :placeholder="item.placeholder" style="width: 100%" />
      </el-form-item>
      <!-- 输入框(数字) -->
      <el-form-item v-else-if="item.type === 'input' && item.dataType === 'number'" :label="item.label">
        <el-input-number v-model="form[item.field]" controls-position="right" :min="0" />
      </el-form-item>
      <!-- 单选框(数据异步加载) -->
      <el-form-item v-else-if="item.type === 'select'" :label="item.label">
        <XLSelect
          v-model="form[item.field]"
          :placeholder="item.placeholder"
          :url="item.url"
          :method="item.method"
          :data="item.data"
          :label-key="item.labelKey"
          :value-key="item.valueKey"
          @getValue="getValue($event, item.field)"
        />
      </el-form-item>
      <!-- 复选框(数据异步加载) -->
      <el-form-item v-else-if="item.type === 'selectCheck'" :label="item.label">
        <XLRemoteMultipleSelect
          v-model="form[item.field]"
          :placeholder="item.placeholder"
          :url="item.url"
          multiple
          collapse-tags
        />
      </el-form-item>
      <!-- 单选树形下拉框(数据异步加载) -->
      <el-form-item v-else-if="item.type === 'treeSelect'" :label="item.label">
        <XLRemoteTreeSelect
          :props="item.props"
          :value="form[item.field]"
          :placeholder="item.placeholder"
          :option-data="item.optionData"
          :url="item.url"
          @getValue="getValue($event, item.field)"
        />
      </el-form-item>
      <!-- 日期选择 -->
      <el-form-item v-else-if="item.type === 'date'" :label="item.label">
        <el-date-picker
          v-model="form[item.field]"
          :type="item.type"
          value-format="yyyy-MM-dd"
          :placeholder="item.placeholder"
        />
      </el-form-item>
      <!-- 日期选择 -->
      <el-form-item v-else-if="item.type === 'daterange'" :label="item.label">
        <el-date-picker
          v-model="form[item.field]"
          :type="item.type"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        />
      </el-form-item>
    </span>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import XLSelect from '@/components/XLSelect'
import XLRemoteMultipleSelect from '@/components/XLRemoteMultipleSelect'
import XLRemoteTreeSelect from '@/components/XLRemoteTreeSelect'

export default {
  name: 'XLQueryForm',
  components: {
    XLSelect,
    XLRemoteMultipleSelect,
    XLRemoteTreeSelect
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
      }
    }
  },
  created() {
    // 初始化queryform的值
    const init = {}
    this.list.map(item => {
      init[item.field] = item.value
    })
    this.form = init
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', this.form)
    },
    getValue(value, field) {
      console.log('queryForm', value, field)
      this.form[field] = value
    }
  }
}
</script>

<style>

</style>
