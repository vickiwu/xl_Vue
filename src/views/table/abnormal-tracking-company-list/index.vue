<template>
  <div class="abnormal-tracking-company-list-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="机构" name="first">
        <BusinessList />
      </el-tab-pane>
      <el-tab-pane label="行业" name="second">
        <IndustryList />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BusinessList from './components/BusinessList'
import IndustryList from './components/IndustryList'

export default {
  name: 'ComplexTable',
  components: {
    BusinessList,
    IndustryList
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="scss" scoped>
.abnormal-tracking-company-list-container {
  // padding: 10px;

  .query-button {
    float: right;
  }
}
</style>
