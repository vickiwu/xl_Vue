<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
        color: ['#77c3f4', '#C8B6EB'],
        title: {
          text: '近30天用电量',
          padding: [5, 10],
          textStyle: {
            fontSize: 16,
            color: '#001529'
          }
        },
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 35,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['expected', 'actual'],
          left: 'right'
        },
        series: [{
          name: 'expected', itemStyle: {
            normal: {
              color: '#77C3F4',
              lineStyle: {
                color: '#77C3F4',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: [100, 120, 161, 134, 105, 160, 165],
          animationDuration: 2800,
          animationEasing: 'cubicInOut',
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(119,195,244' + ', 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(119,195,244' + ', 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          }
        },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#C8B6EB',
              lineStyle: {
                color: '#C8B6EB',
                width: 2
              }
            }
          },
          data: [120, 82, 91, 154, 162, 140, 145],
          animationDuration: 2800,
          animationEasing: 'quadraticOut',
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(200,182,235' + ', 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(200,182,235' + ', 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          }
        }]
      })
    }
  }
}
</script>
