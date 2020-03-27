import { getStorageByKey, Keys } from '@/utils/sessionstorage'

export default {
  inserted(el, binding, vnode) {
    const { buttons } = JSON.parse(getStorageByKey(Keys.buttons))
    const { value } = binding

    if (buttons && buttons.length > 0) {
      const hasPermission = buttons.some(button => button === value)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`have no permission in this page`)
    }
  }
}
