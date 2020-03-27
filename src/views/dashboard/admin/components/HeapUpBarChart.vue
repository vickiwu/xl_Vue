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
    autoResize: {
      type: Boolean,
      default: true
    }
    // chartData: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
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
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: '近30天异常排名',
          textStyle: {
            fontSize: 16,
            color: '#001529'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['污处设施异常', '大气污染管控异常'],
          left: 'right'
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
          data: ['无锡市生态环境局', '苏州市生态环境局', '宿迁市生态环境局', '南通市生态环境局', '连云港市环境保护局', '扬州市环境保护局', '南京市环境保护局']
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
          data: [420, 602, 501, 634, 690, 730, 520]
        }
        ],
        series: [
          {
            name: '污处设施异常',
            type: 'bar',
            stack: '总量',
            data: [320, 302, 301, 334, 390, 330, 320],
            animationDuration
          },
          {
            name: '大气污染管控异常',
            type: 'bar',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
            animationDuration
          }
        ]
      })
    }
  }
}
</script>

<style>
</style>
