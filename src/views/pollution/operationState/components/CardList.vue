<template>
  <el-row class="panel-group" :gutter="40">
    <el-col v-for="(card, idx) in cardList" :key="card.icon" :xs="24" :sm="12" :lg="24/cardList.length" class="card-panel-col">
      <Card :data="card" :index="idx" />
    </el-col>
  </el-row>
</template>

<script>
import Card from './Card'

export default {
  name: 'CardList',
  components: {
    Card
  },
  props: {
    cardList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }
}
</style>
