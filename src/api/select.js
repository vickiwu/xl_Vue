import request from '@/utils/request'

export function fetchList(url, method) {
  return request({
    url,
    method
  })
}

export function fetchTreeList(url) {
  return request({
    url,
    method: 'get'
  })
}

/**
 * 获取下拉值
 * @param {*} url 请求地址
 * @param {*} params 请求参数Select
 */
export function fetchSelectOptions(url, params) {
  return request({
    method: 'post',
    url,
    params
  })
}

