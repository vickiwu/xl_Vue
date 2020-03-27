<template>
  <el-row>
    <el-row>
      <XLDateSwitch />
      <el-button type="primary">查询</el-button>
      <el-button type="primary">详细信息</el-button>
    </el-row>
    <el-row>
      <div class="chart-container">
        <!-- <chart height="100%" width="100%" /> -->
      </div>
    </el-row>
  </el-row>
</template>

<script>
// import Chart from '@/components/Charts/LineMarker'
import XLDateSwitch from '@/components/XLDateSwitch'

export default {
  name: 'ElectricityData',
  components: {
    // Chart,
    XLDateSwitch
  }
}
</script>

<style>
.chart-container{
  position: relative;
  width: calc(100% - 20px);
  height: calc(100vh - 200px);
  padding-top: 10px;
}
</style>
