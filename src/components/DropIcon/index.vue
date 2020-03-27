<template>
  <transition name="el-zoom-in-center">
    <div v-if="edit" class="drop-icon" @click="deleteEle">
      <span>
        <i class="el-icon-delete" />
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DropIcon',
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deleteEle() {
      this.$emit('deleteEle')
    }
  }
}
</script>

<style lang="scss" scoped>
.drop-icon {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;

  span {
    float: right;
    margin-top: 5px;
    margin-right: 5px;

    i {
      color: #ff4949;
    }
  }
}
</style>
