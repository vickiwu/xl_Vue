import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { sendMessage } from '@/utils/request'
import { fetchPermissions } from '@/api/permission'
import { setStorageByKey, Keys } from '@/utils/sessionstorage'
// import { vm } from '@/main'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  console.log('from', from, to)
  // 从框架系统访问子系统时，需先获取框架传递的token,作为统一令牌
  if (to && to.query && to.query.token) {
    store.dispatch('user/loginByToken', to.query.token)
  }

  // TODO 验证权限功能
  fetchPermissions().then(({ code, data }) => {
    setStorageByKey(Keys.buttons, JSON.stringify(data))
  })

  // TODO 参数配置 根据项目要求重新配置
  // 子项目路由跳转的时候 sendMessage 给框架项目 ,用户框架项目确定子系统的路由
  sendMessage({
    sysCode: '102',
    res: to.fullPath,
    params: {
      orgId: '13920',
      isImportamt: 1
    }
  })
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    console.log('this is has token')
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasAddRoutes = store.getters.permission_routes
      if (hasAddRoutes && hasAddRoutes.length === 0) {
        await store.dispatch('permission/generateRoutes1')
        next()
      } else {
        next()
      }
      // const accessRoutes = await store.dispatch('permission/generateRoutes1')
      // router.addRoutes(accessRoutes)
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // if (hasRoles) {
      //   next()
      // } else {
      //   try {
      //     // get user info
      //     // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
      //     const { roles } = await store.dispatch('user/getInfo')

      //     // // generate accessible routes map based on roles
      //     const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

      //     // // dynamically add accessible routes
      //     // router.addRoutes(accessRoutes)

      //     // hack method to ensure that addRoutes is complete
      //     // set the replace: true, so the navigation will not leave a history record
      //     next({ ...to, replace: true })
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
