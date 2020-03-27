<template>
  <el-select v-model="selectVal" :placeholder="placeholder" :multiple="multiple" :collapse-tags="collapseTags">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script>
import { fetchList } from '@/api/select'

export default {
  name: 'XLRemoteMultipleSelect',
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
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
    fetchList(this.url, this.query).then(({ code, data }) => {
      this.options = data
    })
  }
}
</script>

<style>

</style>
