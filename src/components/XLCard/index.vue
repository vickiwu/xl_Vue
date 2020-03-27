<template>
  <div class="card-panel">
    <div class="card-panel-icon-wrapper icon-people">
      <svg-icon :icon-class="data.icon" class-name="card-panel-icon" />
    </div>
    <div class="card-panel-description">
      <router-link :to="{ name: 'AbnormalTrackingCompanyList' }">
        <div class="card-panel-text">{{ data.title }}</div>
        <count-to :start-val="0" :end-val="data.count" :duration="2600" class="card-panel-num" />
      </router-link>
    </div>
    <drop-icon :edit="edit" @deleteEle="deleteEle" />
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import DropIcon from '@/components/DropIcon'

export default {
  components: {
    CountTo,
    DropIcon
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {
          title: '',
          icon: '',
          count: '',
          unit: '',
          url: ''
        }
      }
    }
  },
  methods: {
    deleteEle(idx) {
      this.$emit('deleteEle', idx)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
</style>
