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
    },
    data: {
      type: Array,
      default: () => []
    },
    rad: {
      type: [Array, String],
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
      option.series[0].radius = this.rad || this.radius
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
          trigger: 'item',
          formatter: function({ seriesName, data, percent }) {
            return `${seriesName} <Br/> ${data.name}: ${data.value[0]} ${data.value[2]}(${percent}%)`
          }
        },
        series: [
          {
            name: '所占比例',
            type: 'pie',
            radius: ['20%', '30%'],
            avoidLabelOverlap: false,
            animationDuration,
            label: {
              normal: {
                show: true,
                formatter: function({ seriesName, data, percent }) {
                  return `${data.name}: \n ${data.value[0]} ${data.value[2]}`
                }
              },
              emphasis: {
                show: true
              }
            },
            data: []
          }
        ]
      })
    },
    eConsole(param) {
      if (this.path) {
        this.$router.push({ path: `/${this.path}`, query: { id: param.data.value[1] }})
      }
    }
  }
}
</script>

<style>
</style>
