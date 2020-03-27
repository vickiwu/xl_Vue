<template>
  <div>
    <XLQueryForm
      :list="formList"
      @onSubmit="queryList"
    />

    <XLTable
      :data="list"
      :pagination="pagination"
      :columns="tableColumns"
      :stripe="false"
      column-type="index"
      @xl-size-change="handleSizeChange"
      @current-page-change="handlePageChange"
      @xl-selection-change="handleSelectionChange"
      @xl-cell-click="handleCellClick"
    />
  </div>
</template>

<script>
import { fetchCompantList } from '@/api/tracking-company-list'
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
      value: '',
      query: {
        token: 6480533415686144,
        queryType: 0,
        searchType: 1,
        companyName: '',
        orgId: 13920,
        industryId: -1,
        Pf_statusId: -1,
        classfiyCompany: -1,
        pIdx: 1,
        pSize: 100
      },
      list: [],
      pagination: {
        pageSize: 10,
        total: 11,
        pageIndex: 1
      },
      tableColumns: [
        {
          label: '机构',
          prop: 'OrgName',
          align: 'center',
          sortable: true
        },
        {
          label: '企业',
          align: 'center',
          sortable: true,
          render: (row, index) => {
            return (
              <router-link to={`/table/company-info/${row.CompanyId}`} class='link-type'>{ row.CompanyName }</router-link>
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
          label: '企业状态',
          prop: 'StatusName',
          align: 'center',
          width: '60',
          sortable: true,
          formatter: (row, column, index1, idx2) => {
            return row.UserStatusDesc
          }
        },
        {
          label: '生产状态',
          prop: 'EP_PfName',
          align: 'center',
          width: '60',
          sortable: true
        },
        {
          label: '运维公司',
          prop: 'ConstructionUnitName',
          align: 'center',
          sortable: true
        },
        {
          label: '产污设施数量',
          prop: 'EP_PfCount',
          align: 'center',
          sortable: true
        },
        {
          label: '污处设施数量',
          prop: 'EP_EpCount',
          align: 'center',
          sortable: true
        },
        {
          label: '监测点数量（个）',
          align: 'center',
          headerAlign: 'center',
          children: [
            {
              label: '总数',
              align: 'center',
              prop: 'DeviceCount',
              width: '40',
              sortable: true
            },
            {
              label: '运行',
              align: 'center',
              prop: 'RunCount',
              width: '40',
              sortable: false
            },
            {
              label: '停用',
              align: 'center',
              prop: 'DisabledCount',
              width: '40',
              sortable: true
            },
            {
              label: '调试',
              align: 'center',
              prop: 'DebugCount',
              width: '40',
              sortable: true
            }
          ]
        },
        {
          label: '地址',
          align: 'center',
          prop: 'Addr',
          sortable: true
        },
        {
          label: '操作',
          align: 'right',
          buttonGroups: [
            {
              name: '编辑',
              type: 'success',
              icon: 'el-icon-edit',
              click(row, index) {
                console.log(row)
              }
            }
          ]
        }
      ],
      formList: [
        {
          label: '名称',
          field: 'companyName',
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
          field: 'Pf_statusId',
          type: 'select',
          placeholder: '请选择生产状态',
          url: '/operationState/status',
          method: 'POST',
          labelKey: 'OptionValue',
          valueKey: 'OptionKay'
        },
        {
          label: '运维公司',
          field: 'classfiyCompany',
          type: 'treeSelect',
          placeholder: '请选择运维公司',
          url: '/operationState/companys',
          props: {
            value: 'id', // ID字段名
            label: 'text', // 显示名称
            children: 'children' // 子级字段名
          }
        }
      ]
    }
  },
  created() {
    this.value = this.$route.params
    console.log('params', this.value)
    this.getList()
  },
  methods: {
    getList() {
      fetchCompantList(this.query).then(({ code, data, PageIndex, TotalCount }) => {
        this.list = data
      })
    },
    handleSizeChange(val) {
      this.pagination = {
        ...this.pagination,
        pageIndex: 1,
        pageSize: val
      }
      console.log('size change', this.pagination)

      this.query = {
        ...this.query,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      }
      this.getList()
    },
    handlePageChange(val) {
      this.pagination = {
        ...this.pagination,
        pageIndex: val
      }
      console.log('page ...', this.pagination)
      this.query = {
        ...this.query,
        pageIndex: val
      }
      this.getList()
    },
    handleSelectionChange(val) {
      console.log('change ', val)
    },
    handleCellClick(row, column, cell, event) {
      console.log('row', row)
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
