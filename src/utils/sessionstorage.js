
/**
 * 缓存指定的值至sessionStorage
 */
export const Keys = {
  /**
   * 保存在浏览器缓存中的key (权限按钮)
   */
  get buttons() { return 'permission-button' }
}

export function getStorageByKey(key) {
  return sessionStorage.getItem(key)
}

export function setStorageByKey(key, token) {
  return sessionStorage.setItem(key, token)
}

export function removeStorageByKey(key) {
  return sessionStorage.removeItem(key)
}
