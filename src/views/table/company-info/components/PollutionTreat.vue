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
import { fetchAbnormalInformation } from '@/api/company-info'

export default {
  name: 'PollutionTreat',
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
          label: '产污设施',
          prop: 'PollutionSource',
          align: 'center'
        },
        {
          label: '污处设施设备',
          prop: 'PollutionMonitoringPoint',
          align: 'center'
        },
        {
          label: '发生时间',
          prop: 'HappenTime',
          align: 'center'
        },
        {
          label: '恢复时间',
          prop: 'RecoveryTime',
          align: 'center'
        },
        {
          label: '申报状态',
          prop: 'DeclareStatus',
          align: 'center'
        },
        {
          label: '检查状态',
          prop: 'CheckStatus',
          align: 'center'
        }
      ],
      data: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const params = {}
      fetchAbnormalInformation(params).then(({ code, data }) => {
        this.data = data
      })
    }
  }
}
</script>

<style>

</style>
