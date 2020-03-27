<template>
  <el-row>
    <XLQueryForm
      :list="formList"
      @onSubmit="queryList"
    />

    <card-list ref="children" :card-list="cards" />

    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-tabs v-model="activeName.firstPanel" @tab-click="handleClick">
          <el-tab-pane label="污处异常企业" name="first">
            <BarChart :x-axis-data="abnormalObj.xAxisData" :data="abnormalObj.AbnormalComList" />
          </el-tab-pane>
          <el-tab-pane label="检查企业" name="second">
            <BarChart :data="abnormalObj.InValidComList" :x-axis-data="abnormalObj.xAxisData" />
          </el-tab-pane>
          <el-tab-pane label="立案处罚企业" name="third">
            <BarChart :data="abnormalObj.CheckedComList" :x-axis-data="abnormalObj.xAxisData" />
          </el-tab-pane>
          <el-tab-pane label="处罚金额" name="fourth">
            <BarChart :data="abnormalObj.PunishedComList" :x-axis-data="abnormalObj.xAxisData" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-tabs v-model="activeName.secondPanel">
          <el-tab-pane label="异常时长Top5" name="first">
            <HeapUpBarChart :y-axis-data="abnormalTopObj.yAxisData" :data="abnormalTopObj.data" :path="abnormalTopObj.path" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-tabs v-model="activeName.thirdPanel">
          <el-tab-pane label="异常企业行业分布" name="first">
            <PieChart :data="abnormalIndustryObj.data" :rad="abnormalIndustryObj.radius" :path="abnormalIndustryObj.path" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-tabs v-model="activeName.fourthPanel">
          <el-tab-pane label="异常原因统计" name="first">
            <PieChart :data="abnormalReasonsObj.data" :rad="abnormalReasonsObj.radius" :path="abnormalReasonsObj.path" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-tabs v-model="activeName.fifthPanel">
          <el-tab-pane label="异常查处率" name="first">
            <RaddarChart />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

  </el-row>

</template>

<script>
import XLQueryForm from '@/components/XLQueryForm'
import moment from 'moment'
import { fetchOperationStateList } from '@/api/pollution/operationState'
import CardList from './components/CardList'
import BarChart from '@/components/XLCharts/BarChart'
import HeapUpBarChart from '@/components/XLCharts/HeapUpBarChart'
import PieChart from '@/components/XLCharts/PieChart'
import RaddarChart from '@/components/XLCharts/RaddarChart'

export default {
  name: 'OperationState',
  components: {
    XLQueryForm,
    CardList,
    BarChart,
    HeapUpBarChart,
    PieChart,
    RaddarChart
  },
  data() {
    return {
      statistics: [],
      query: {
        orgId: '',
        startDate: '',
        endDate: '',
        queryType: 1,
        token: 6480533415686144
      },
      formList: [
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
          label: '时间',
          field: 'time',
          type: 'daterange',
          value: [new Date(), new Date()],
          placeholder: '请选择时间'
        }
      ],
      cards: [
        {
          title: '污处异常企业',
          prop: 'AbnormalComNum',
          count: 0,
          unit: '家',
          url: 'companylist',
          id: 0
        },
        {
          title: '有效申报企业',
          prop: 'DeclaredComNum',
          count: 0,
          unit: '家',
          url: 'companylist',
          id: 1
        },
        {
          title: '无效申报企业',
          prop: 'UndeclaredComNum',
          count: 0,
          unit: '家',
          url: 'companylist',
          id: 2
        },
        {
          title: '已检查企业',
          prop: 'CheckedComNum',
          count: 0,
          unit: '家',
          url: 'companylist',
          id: 3
        },
        {
          title: '立案处罚企业',
          prop: 'PunishedComNum',
          count: 0,
          unit: '家',
          url: 'companylist',
          id: 4
        },
        {
          title: '处罚金额',
          prop: 'PunishedMoney',
          count: 0,
          unit: '万元',
          url: 'companylist',
          id: 4
        }
      ],
      activeName: {
        firstPanel: 'first',
        secondPanel: 'first',
        thirdPanel: 'first',
        fourthPanel: 'first',
        fifthPanel: 'first'
      },
      abnormalObj: {
        AbnormalComList: [],
        InValidComList: [],
        CheckedComList: [],
        PunishedComList: [],
        xAxisData: []
      },
      abnormalTopObj: {
        yAxisData: [],
        data: [],
        // TODO 链接跳转到真实页面
        path: 'table/abnormal-tracking-company-list'
      },
      abnormalIndustryObj: {
        data: [],
        // TODO 链接跳转到真实页面
        path: 'table/abnormal-tracking-company-list',
        radius: ['30%', '70%']
      },
      abnormalReasonsObj: {
        data: [],
        // TODO 链接跳转到真实页面
        path: 'table/abnormal-tracking-company-list',
        radius: '55%'
      }
    }
  },
  created() {
    this.fetchInfo()
  },
  methods: {
    fetchInfo() {
      fetchOperationStateList(this.query).then(({ code, data }) => {
        this.statistics = data
        this.cards.map(item => {
          item.count = this.statistics.Data[item.prop]
        })
        const xAxis = []
        const abnormalList = []
        const inValidList = []
        const checkedList = []
        const punishedList = []
        this.statistics.Data.AbnormalComDistribution.map(item => {
          xAxis.push(item.OrgName)
          abnormalList.push(item.AbnormalComList.length)
          inValidList.push(item.InValidComList.length)
          checkedList.push(item.CheckedComList.length)
          punishedList.push(item.PunishedComList.length)
        })
        this.abnormalObj.xAxisData = [...xAxis]
        this.abnormalObj.AbnormalComList = [...abnormalList]
        this.abnormalObj.InValidComList = [...inValidList]
        this.abnormalObj.CheckedComList = [...checkedList]
        this.abnormalObj.PunishedComList = [...punishedList]

        const abnormalNumData = []
        const abnormalAxisData = []
        this.statistics.Data.AbnormalComTop10.map(item => {
          abnormalNumData.push(item.AbnormalNum)
          abnormalAxisData.push({ value: { value: item.CompanyName, id: item.CompanyId }})
        })
        this.abnormalTopObj.data = [...abnormalNumData]
        this.abnormalTopObj.yAxisData = [...abnormalAxisData]

        const abnormalIndustryData = []
        this.statistics.Data.AbnormalComIndustrys.map(item => {
          abnormalIndustryData.push({ value: [item.AbnormalComNum, item.IndustryId, '家'], name: item.IndustryName })
        })
        this.abnormalIndustryObj.data = [...abnormalIndustryData]

        const abnormalReasonsData = []
        this.statistics.Data.AbnormalReasons.map(item => {
          abnormalReasonsData.push({ value: [item.ReasonNum, item.ReasonId, '次'], name: item.Reason })
        })
        this.abnormalReasonsObj.data = [...abnormalReasonsData]
      })
    },
    queryList(data) {
      const { time, orgId } = data
      this.query = { ...this.query,
        startDate: time ? moment(time[0]).format('YYYY-MM-DD') : '',
        endDate: time ? moment(time[1]).format('YYYY-MM-DD') : '',
        orgId
      }
      this.fetchInfo()
    },
    handleClick(tab, event) {
      // 页面tab页切换时 触发BarChart数据更新，以刷新柱状图的渲染
      switch (this.activeName.firstPanel) {
        case 'first':
          this.abnormalObj.AbnormalComList = [...this.abnormalObj.AbnormalComList]
          break
        case 'second':
          this.abnormalObj.InValidComList = [...this.abnormalObj.InValidComList]
          break
        case 'third':
          this.abnormalObj.CheckedComList = [...this.abnormalObj.CheckedComList]
          break
        default:
          this.abnormalObj.PunishedComList = [...this.abnormalObj.PunishedComList]
          break
      }
    }
  }
}
</script>

<style>

</style>
