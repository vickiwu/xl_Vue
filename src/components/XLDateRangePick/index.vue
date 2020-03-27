<template>
  <el-date-picker
    v-model="value"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions"
  />
</template>

<script>
// import moment from 'moment'

export default {
  name: 'XLDateRangePick',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      value: [new Date(), new Date()]
    }
  }
}
</script>

<style>

</style>
