const state = {
  showHeader: true
}

const mutations = {
  hideHeader(state) {
    state.showHeader = false
  },
  showHeader(state) {
    state.showHeader = true
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
