<template>
  <el-row>
    <el-col :span="4">
      <el-tree
        :data="list"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick"
      />
    </el-col>
    <el-col :span="20">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用电数据" name="first">
          <electricity-data />
        </el-tab-pane>
        <el-tab-pane label="污处异常" name="second">
          <pollution-treat />
        </el-tab-pane>
        <el-tab-pane label="减排异常" name="third">
          <EmissionReduction />
        </el-tab-pane>
        <el-tab-pane label="企业档案" name="forth">
          <EnterpriseArchives />
        </el-tab-pane>
        <el-tab-pane label="企业地图" name="fifth">
          <BusinessMap />
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { fetchList } from '@/api/company-info'
import ElectricityData from './components/ElectricityData'
import PollutionTreat from './components/PollutionTreat'
import EmissionReduction from './components/EmissionReduction'
import EnterpriseArchives from './components/EnterpriseArchives'
import BusinessMap from './components/BusinessMap'

export default {

  name: 'CompanyInfo',
  components: {
    ElectricityData,
    PollutionTreat,
    EmissionReduction,
    EnterpriseArchives,
    BusinessMap
  },
  data() {
    return {
      activeName: 'first',
      defaultProps: {
        children: 'children',
        label: 'text',
        iconClass: 'icon'
      },
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList().then(({ code, data }) => {
        this.list = [data]
        console.log('this data', data)
      })
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }

}
</script>

<style scoped>

</style>
