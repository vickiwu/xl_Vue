
<template>
  <section class="container">
    <el-table
      ref="table"
      v-loading="$attrs.loading"
      v-bind="$attrs"
      :data="data"
      :size="defaultOptions.size"
      :border="border"
      :stripe="stripe"
      :header-row-class-name="defaultOptions.headerRowClassName"
      :height="height"
      :max-height="maxHeight"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :row-ket="rowKey"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :style="tableStyle"
      @select="(selection, row) => emitEventHandler('xl-select', selection, row)"
      @select-all="selection => emitEventHandler('xl-select-all', selection)"
      @selection-change="selection => emitEventHandler('xl-selection-change', selection)"
      @cell-mouse-enter="(row, column, cell, event) => emitEventHandler('xl-cell-mouse-enter', row, column, cell, event)"
      @cell-mouse-leave="(row, column, cell, event) => emitEventHandler('xl-cell-mouse-leave', row, column, cell, event)"
      @cell-click="(row, column, cell, event) => emitEventHandler('xl-cell-click', row, column, cell, event)"
      @cell-dblclick="(row, column, cell, event) => emitEventHandler('xl-cell-dblclick', row, column, cell, event)"
      @row-click="(row, event, column) => emitEventHandler('xl-row-click', row, event, column)"
      @row-dblclick="(row, event) => emitEventHandler('xl-row-dblclick', row, event)"
      @row-contextmenu="(row, event) => emitEventHandler('xl-row-contextmenu', row, event)"
      @header-click="(column, event) => emitEventHandler('xl-header-click', column, event)"
      @sort-change="args => emitEventHandler('xl-sort-change', args)"
      @filter-change="filters => emitEventHandler('xl-filter-change', filters)"
      @current-change="(currentRow, oldCurrentRow) => emitEventHandler('xl-current-change', currentRow, oldCurrentRow)"
      @header-dragend="(newWidth, oldWidth, column, event) => emitEventHandler('xl-header-dragend', newWidth, oldWidth, column, event)"
      @expand-change="(row, expanded) => emitEventHandler('xl-expand-change', row, expanded)"
      v-on="$listeners"
    >
      <template v-if="columnType">

        <el-table-column v-if="columnType === 'expand'" type="expand" align="center">
          <template slot-scope="props">
            <slot name="expand" v-bind="props" />
          </template>
        </el-table-column>

        <el-table-column v-else :type="columnType" :label="columnTypeName" align="center" />
      </template>

      <XLColumn v-for="(item,index) in columns" :key="index" :col="item" />

    </el-table>
    <el-pagination
      v-if="isPagination && (pagination.total > pagination.pageSize)"
      :current-page="pagination.pageIndex"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :page-sizes="pagination.pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 15px"
      v-on="$listeners"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </section>
</template>

<script>
import XLColumn from './XLColumn'
import props from './props'

export default {
  name: 'XLTable',

  components: {
    XLColumn
  },

  props: {
    ...props,
    // table 数据
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    columnType: {
      type: String,
      default: 'index',
      validator(value) {
        return ['selection', 'index', 'expand'].includes(value)
      }
    },
    // 对应列的类型的名称
    columnTypeName: {
      type: String,
      default: ''
    },
    // 是否显示分页
    isPagination: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          pageSize: 10,
          total: 0,
          pageIndex: 0,
          pageSizes: [10, 20, 50, 100, 500, 5000],
          layout: 'total, sizes, prev, pager, next, jumper'
        }
      }
    }
  },

  data() {
    return {
      // table 默认参数
      defaultOptions: {
        // border: true,
        // size: 'mini',
        // stripe: true,
        headerRowClassName: 'table-header-row'
      }
    }
  },

  created() {
    Object.assign(this.defaultOptions, this.$attrs)
  },

  mounted() {
    // event: expand changed to `expand-change` in Element v2.x
    this.$refs['table'].$on('expand', (row, expanded) => this.emitEventHandler('expand', row, expanded))
  },

  methods: {
    emitEventHandler(event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    handleSizeChange(val) {
      this.$emit('xl-size-change', val)
    },
    handlePageChange(val) {
      this.$emit('current-page-change', val)
    }
  }
}
</script>
