<template>
  <el-row v-if="edit" :gutter="40" class="panel-group">
    <draggable :set-data="setData" :list="cardList" group="article" class="dragArea">
      <el-col v-for="(card, idx) in cardList" :key="card.icon" :xs="24" :sm="12" :lg="24/cardList.length" class="card-panel-col">
        <XLCard :edit="edit" :data="card" :index="idx" @deleteEle="deleteEle(idx)" />
      </el-col>
    </draggable>
  </el-row>
  <el-row v-else :gutter="40" class="panel-group">
    <el-col v-for="(card, idx) in cardList" :key="card.icon" :xs="24" :sm="12" :lg="24/cardList.length" class="card-panel-col">
      <XLCard :data="card" :index="idx" />
    </el-col>
  </el-row>
</template>

<script>
import draggable from 'vuedraggable'
import XLCard from '@/components/XLCard'

export default {
  components: {
    draggable,
    XLCard
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    cardList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    deleteEle(idx) {
      this.$emit('deleteEle', idx)
    }
    // update() {
    //   this.setToStorage(this.showCardList)
    // }
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

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
