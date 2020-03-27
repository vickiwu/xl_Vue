<template>
  <div>
    <XLQueryForm
      :list="formList"
      @onSubmit="queryList"
    />

    <XLTable
      :data="businessList"
      :columns="tableColumns"
      :show-summary="true"
      :summary-method="getSummaries"
    />

  </div>
</template>

<script>
import { fetchBusinessList } from '@/api/tracking-company-list'
import XLTable from '@/components/XLTable'
import XLQueryForm from '@/components/XLQueryForm'

export default {
  name: 'BusinessList',
  components: {
    XLTable,
    XLQueryForm
  },
  data() {
    return {
      query: {
        token: 6480533415686144,
        companyName: '', // 名称
        userId: 0,
        queryType: 1,
        searchType: 0,
        orgId: 15542,
        industryId: 0, // 行业
        statusId: -1 // 生产状态
      },
      formList: [
        {
          label: '名称',
          field: 'companyName',
          type: 'input',
          dataType: 'text',
          placeholder: '请输入名称'
        },
        {
          label: '行业',
          field: 'industryId',
          type: 'select',
          placeholder: '请选择行业',
          labelKey: 'text',
          valueKey: 'id',
          url: '/operationState/inds',
          method: 'POST'
        },
        {
          label: '生产状态',
          field: 'statusId',
          type: 'select',
          placeholder: '请选择生产状态',
          url: '/operationState/status',
          method: 'POST',
          labelKey: 'OptionValue',
          valueKey: 'OptionKay'
        }
      ],
      businessList: [],
      tableColumns: [
        {
          label: '机构',
          prop: 'OutName',
          align: 'center',
          render: (row, index) => {
            return (
              <router-link to={`business-list/${row.OutId}`} class='link-type'>{ row.OutName }</router-link>
            )
          }
        },
        {
          label: '企业数量(家)',
          prop: 'OutTotalCompany',
          align: 'center'
        },
        {
          label: '产污设施数量(处)',
          prop: 'OutTotalEP_Pf',
          align: 'center'
        },
        {
          label: '污处设施数量(处)',
          prop: 'OutTotalEP_Ep',
          align: 'center'
        },
        {
          label: '监测点数量(个)',
          prop: 'Index',
          align: 'center',
          children: [
            {
              label: '总数',
              prop: 'OutTotalDevice',
              align: 'center'
            },
            {
              label: '运行',
              prop: 'OutRunCount',
              align: 'center'
            },
            {
              label: '停用',
              prop: 'OutDisabledCount',
              align: 'center'
            },
            {
              label: '调试',
              prop: 'OutDebugCount',
              align: 'center'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.getList()
    },
    getValue(value) {
      console.log('父组件中的值', value)
      this.query.industryId = value
    },
    getList() {
      fetchBusinessList(this.query).then(({ code, data }) => {
        this.businessList = data
      })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = '-'
        }
      })
      return sums
    },
    queryList(val) {
      this.query = { ...this.query, ...val }
      this.getList()
    }
  }
}
</script>

<style>

</style>
