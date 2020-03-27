<template>
  <span>
    <el-button class="arrow" icon="el-icon-arrow-left" @click="prevDate" />
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions"
    />
    <el-button class="arrow" icon="el-icon-arrow-right" :disabled="disable" @click="nextDate" />
  </span>
</template>

<script>
import moment from 'moment'

export default {
  name: 'XLDateSwitch',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      value: new Date(),
      disable: true
    }
  },
  methods: {
    prevDate() {
      const date = moment(this.value)
      this.value = date.add(-1, 'days')
      if (this.value.date() < moment().date()) {
        this.disable = false
      }
    },
    nextDate() {
      const date = moment(this.value)
      this.value = date.add(1, 'days')
      if (this.value.date() >= moment().date()) {
        this.disable = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow {
    cursor: pointer;
    border: 0;
    &:hover {
        background: #fff;
    }
    &:focus {
        background-color: #fff;
    }
}
</style>
