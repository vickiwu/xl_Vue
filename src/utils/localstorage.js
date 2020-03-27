
/**
 * 缓存指定的值至localStorage
 */
export const Keys = {
  /**
   * 获取头部卡片token
   */
  get card() { return 'Card-Token' },

  /**
   * 获取组件token
   */
  get component() { return 'Component-Token' }
}

export function getStorageByKey(key) {
  return localStorage.getItem(key)
}

export function setStorageByKey(key, token) {
  return localStorage.setItem(key, token)
}

export function removeStorageByKey(key) {
  return localStorage.removeItem(key)
}
