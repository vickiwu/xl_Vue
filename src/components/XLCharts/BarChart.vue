<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    data: {
      type: Array,
      default: () => []
    },
    xAxisData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    data: function(newVal, oldVal) {
      const option = this.chart.getOption()
      option.series[0].data = newVal
      if (this.chart) {
        this.chart.resize()
        this.chart.setOption(option)
      }
    },
    xAxisData: function(newVal, oldVal) {
      const option = this.chart.getOption()
      option.xAxis[0].data = newVal
      if (this.chart) {
        this.chart.setOption(option)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  updated() {
    console.log('this tab is update')
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['pageA', 'pageB', 'pageC'],
          left: 'right'
        },
        grid: {
          top: 35,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.xAxisData,
          axisLabel: {
            rotate: 30
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'pageAd',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.data,
          animationDuration
        }]
      })
    }
  }
}
</script>
