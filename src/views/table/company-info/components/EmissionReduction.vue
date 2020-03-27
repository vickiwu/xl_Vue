<template>
  <el-row>
    <el-row>
      <XLDateRangePick />
      <el-button type="primary">查询</el-button>
    </el-row>
    <el-row>
      <div class="chart-container">
        <XLTable
          :data="data"
          :pagination="pagination"
          :columns="tableColumns"
        />
      </div>
    </el-row>
  </el-row>
</template>

<script>
import XLDateRangePick from '@/components/XLDateRangePick'
import XLTable from '@/components/XLTable'
import { fetchLimitProduction } from '@/api/company-info'

export default {
  name: 'EmissionReduction',
  components: {
    XLDateRangePick,
    XLTable
  },
  data() {
    return {
      value: '',
      pagination: {
        pageSize: 10,
        total: 0,
        pageIndex: 1
      },
      tableColumns: [
        {
          label: '所属方案',
          prop: 'PlanName',
          align: 'center'
        },
        {
          label: '限产点',
          prop: 'UnitName',
          align: 'center'
        },
        {
          label: '异常类型',
          prop: 'Type',
          align: 'center'
        },
        {
          label: '异常开始时间',
          prop: 'outStartTime',
          align: 'center'
        },
        {
          label: '异常结束时间',
          prop: 'outEndTime',
          align: 'center'
        }
      ],
      data: []
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      const params = {}
      fetchLimitProduction(params).then(({ code, data }) => {
        this.data = data
      })
    }
  }
}
</script>

<style>

</style>
