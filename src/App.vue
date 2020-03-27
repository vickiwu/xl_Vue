<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
  // created() {
  //   if (window.parent && window.parent.postMessage) {
  //     console.log('window parent')
  //     window.parent.postMessage('vue-created', '*')
  //   }
  // }
}
</script>
