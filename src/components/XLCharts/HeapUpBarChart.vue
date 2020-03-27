<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000
// const ecConfig = require('echarts/config')

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
    autoResize: {
      type: Boolean,
      default: true
    },
    yAxisData: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    path: {
      type: String,
      default: null
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
      option.yAxis[1].data = newVal
      this.chart.setOption(option)
    },
    yAxisData: function(newVal, oldVal) {
      const option = this.chart.getOption()
      option.yAxis[0].data = newVal
      this.chart.setOption(option)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
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
      this.chart.on('click', this.eConsole)

      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: function(params, ticket, callback) {
            return `${params[0].axisValue.value}: ${params[0].data}小时`
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 35,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: [{
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          triggerEvent: true,
          axisLabel: {
            formatter: function({ value, id }, index) {
              return `${value}`
            }
          },
          data: this.yAxisData
        },
        {
          type: 'category',
          position: 'right',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function(value, index) {
              return `${value}H`
            }
          },
          triggerEvent: false,
          data: this.data
        }
        ],
        series: [
          {
            type: 'bar',
            stack: '总量',
            data: this.data,
            animationDuration,
            triggerEvent: false,
            itemStyle: {
              // color: "",
              barBorderRadius: 5
            },
            barWidth: 20
          }
        ]
      })
    },
    eConsole(param) {
      if (typeof param.seriesIndex !== 'undefined') {
        return
      }
      if (param.type === 'click') {
        if (this.path) {
          this.$router.push({ path: `/${this.path}`, query: { id: param.value.id }})
        }
      }
    }
  }
}
</script>

<style>
</style>
