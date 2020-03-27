<template>
  <table class="table">
    <tr v-for="(key, idx) in Object.keys(data)" v-if="idx%2 === 0" :key="key">
      <td class="label" style="width:20%">{{ key }}</td>
      <td style="width:30%">{{ data[key] }}</td>
      <td class="label" style="width:20%">{{ Object.keys(data)[idx+1] }}</td>
      <td style="width:30%">{{ data[Object.keys(data)[idx+1]] }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'XLMapTable',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  color: #606266;
  margin-top: 20px;
  border-spacing: 0;
  border-collapse: collapse;
  border: 1px solid #dfe6ec;
  font-size: 14px;

  tr {
    line-height: 23px;
  }
  td {
    padding: 10px;
    text-align: center;
    border: 1px solid #dfe6ec;
  }
  .label {
    font-weight: 700;
    background-color: #eee;
  }
}

</style>
