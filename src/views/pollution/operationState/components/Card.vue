<template>
  <div class="card-panel">
    <router-link :to="{path: data.url, query: {id: data.id}}">
      <el-row class="count">
        <count-to :start-val="0" :end-val="data.count" :duration="2600" class="card-panel-num" />
        <span class="unit">{{ data.unit }}</span>
      </el-row>
      <div class="card-panel-text">{{ data.title }}</div>
    </router-link>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  name: 'Card',
  components: {
    CountTo
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          title: '',
          count: '',
          unit: '',
          url: '',
          id: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-panel {
  display: flex;
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  border: 1px solid #dfe6ec;
  align-items: flex-end;
  justify-content: center;

  .count {
    text-align: center;
    font-size: 24px;
    color: #1890ff;

    .unit {
      font-size: 16px;
      color: #666;
    }
  }

  .card-panel-text {
      text-align: center;
      line-height: 58px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
    }
}
</style>
