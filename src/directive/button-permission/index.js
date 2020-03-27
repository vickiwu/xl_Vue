import permission from './permission'

const install = function(Vue) {
  Vue.directive('button-permission', permission)
}

if (window.Vue) {
  window['button-permission'] = permission
  Vue.use(install) // eslint-disable-line
}

permission.install = install
export default permission
