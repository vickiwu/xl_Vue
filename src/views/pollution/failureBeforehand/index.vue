<template>
  <div>
    <XLQueryForm
      :list="formList"
      @onSubmit="queryList"
    />

    <XLTable
      :data="companyList"
      :pagination="pagination"
      :columns="tableColumns"
    />

  </div>
</template>

<script>
import { fetchList } from '@/api/pollution/failureBeforehand'
import XLTable from '@/components/XLTable'
import XLQueryForm from '@/components/XLQueryForm'
import moment from 'moment'

export default {
  name: 'FailureBeforehand',
  components: {
    XLTable,
    XLQueryForm
  },
  data() {
    return {
      query: {
        token: 6480533415686144,
        pageSize: 10,
        page: 0,
        sortOrder: 'asc',
        yqName: '',
        orgId: 15542,
        startDate: '20200301',
        endDate: '20200303',
        verifyStatus: -1
      },
      pagination: {
        pageSize: 10,
        total: 20,
        pageIndex: 1
      },
      formList: [
        {
          label: '名称',
          field: 'yqName',
          type: 'input',
          dataType: 'text',
          placeholder: '请输入名称'
        },
        {
          label: '机构',
          field: 'orgId',
          type: 'treeSelect',
          placeholder: '请选择机构',
          props: {
            value: 'id', // ID字段名
            label: 'text', // 显示名称
            children: 'children' // 子级字段名
          },
          url: '/operationState/orgs'
        },
        {
          label: '状态',
          field: 'verifyStatus',
          type: 'select',
          value: null,
          labelKey: 'name',
          valueKey: 'code',
          placeholder: '请选择审核状态',
          url: '/common/getData'
        },
        {
          label: '时间',
          field: 'time',
          type: 'daterange',
          value: [new Date(), new Date()],
          placeholder: '请选择生产日期'
        }
      ],
      companyList: [],
      tableColumns: [
        {
          label: '机构',
          prop: 'orgName',
          align: 'center'
        },
        {
          label: '企业名称',
          prop: 'entName',
          align: 'center'
        },
        {
          label: '申报时间',
          prop: 'declareDateTime',
          align: 'center',
          formatter: (row, column, index1, idx2) => {
            return moment(row.declareDateTime, 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm')
          }
        },
        {
          label: '维护设施',
          prop: 'devicesString',
          align: 'center'
        },
        {
          label: '起始时间',
          align: 'center',
          sortable: true,
          formatter: (row, column, index1, idx2) => {
            return moment(row.startTime, 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm')
          }
        },
        {
          label: '结束时间',
          prop: 'endTime',
          align: 'center',
          sortable: true,
          formatter: (row, column, index1, idx2) => {
            return moment(row.endTime, 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm')
          }
        },
        {
          label: '受理状态',
          prop: 'verifyStatusName',
          align: 'center'
        },
        {
          label: '受理环保局',
          prop: 'verifyOrgName',
          align: 'center'
        },
        {
          label: '操作',
          prop: 'Money',
          align: 'center',
          render: (row, index) => {
            return (
              <router-link to={`handleInfo/${row.id}`} class='link-type'>查看详情</router-link>
            )
          }
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList(this.query).then(({ code, result }) => {
        this.companyList = result.data
        this.pagination.total = result.total
      })
    },
    queryList(val) {
      const { time, yqName, orgId, verifyStatus } = val
      const { token } = this.query
      this.query = {
        token,
        orgId,
        yqName,
        verifyStatus,
        sdt: time ? moment(time[0]).format('YYYY-MM-DD') : '',
        edt: time ? moment(time[1]).format('YYYY-MM-DD') : ''
      }
      this.getList()
    }
  }
}
</script>

<style>

</style>
