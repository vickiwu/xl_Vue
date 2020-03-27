<template>
  <el-select
    v-model="selectVal"
    :placeholder="placeholder"
  >
    <el-option
      v-for="item in options"
      :key="valueKey ? item[valueKey] : item.value"
      :label="labelKey ? item[labelKey] : item.label"
      :value="valueKey ? item[valueKey] : item.value"
    />
  </el-select>
</template>

<script>
import { fetchList } from '@/api/select'

export default {
  name: 'XLRemoteSelect',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    labelKey: {
      type: String,
      default: null
    },
    valueKey: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [String, Number],
      default: null
    },
    url: {
      type: String,
      default: ''
    },
    method: {
      type: String,
      default: 'GET'
    }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    selectVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  created() {
    if (this.url) {
      fetchList(this.url, this.method, this.query).then(({ code, data }) => {
        this.options = data
        if (this.value === null || this.value === '') {
          if (data && data.length > 0) {
            const item = data[0]
            this.selectVal = this.valueKey ? item[this.valueKey] : item.value
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
