<template>
  <div>
    <XLQueryForm
      :list="formList"
      @onSubmit="queryList"
    />

    <XLTable
      :data="companyList"
      :columns="tableColumns"
    />

  </div>
</template>

<script>
import { fetchOperationCompanyList } from '@/api/pollution/operationState'
import XLTable from '@/components/XLTable'
import XLQueryForm from '@/components/XLQueryForm'
import moment from 'moment'

export default {
  name: 'Companylist',
  components: {
    XLTable,
    XLQueryForm
  },
  data() {
    return {
      query: {
        token: 6480533415686144,
        orgId: 15542,
        otherType: 0,
        ind: 0, // 行业
        sdt: '', // 生产状态
        edt: ''
      },
      formList: [
        {
          label: '单位',
          field: 'orgId',
          type: 'treeSelect',
          placeholder: '请选择单位',
          props: {
            value: 'id', // ID字段名
            label: 'text', // 显示名称
            children: 'children' // 子级字段名
          },
          url: '/operationState/orgs'
        },
        {
          label: '行业',
          field: 'ind',
          type: 'select',
          labelKey: 'text',
          valueKey: 'id',
          placeholder: '请选择行业',
          url: '/operationState/inds',
          method: 'POST'
        },
        {
          label: '筛选条件',
          field: 'otherType',
          type: 'select',
          value: null,
          placeholder: '请选择筛选条件',
          url: '/operationState/select'
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
          label: '单位',
          prop: 'OrgName',
          align: 'center',
          sortable: true
        },
        {
          label: '企业名称',
          prop: 'ComName',
          align: 'center',
          sortable: true,
          render: (row, index) => {
            return (
              <router-link to={`/table/company-info/${row.CompanyName}`} class='link-type'>{ row.ComName }</router-link>
            )
          }
        },
        {
          label: '行业',
          prop: 'IndustryName',
          align: 'center',
          sortable: true
        },
        {
          label: '异常次数',
          prop: 'InvalidNum',
          align: 'center',
          sortable: true
        },
        {
          label: '现场检查次数',
          prop: 'CheckNum',
          align: 'center',
          sortable: true
        },
        {
          label: '立案处罚次数',
          prop: 'PunishNum',
          align: 'center',
          sortable: true
        },
        {
          label: '处罚金额(万元)',
          prop: 'Money',
          align: 'center',
          sortable: true
        }
      ]
    }
  },
  created() {
    if (this.$route && this.$route.query) {
      const { id } = this.$route.query
      this.query.otherType = id
      // 初始化 从运行状况分析跳转到企业列表时筛选的默认值
      this.formList[2].value = id
    }
    this.getList()
  },
  methods: {
    getList() {
      fetchOperationCompanyList(this.query).then(({ code, data }) => {
        this.companyList = data
      })
    },
    queryList(val) {
      const { time, otherType, orgId, ind } = val
      const { token } = this.query
      this.query = {
        token,
        orgId,
        otherType,
        ind,
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
