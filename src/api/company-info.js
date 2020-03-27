import request from '@/utils/request'

export function fetchList(url) {
  return request({
    url: '/company/list',
    method: 'get'
  })
}

export function fetchArchives(url) {
  return request({
    url: '/company/archives',
    method: 'get'
  })
}

export function fetchAbnormalInformation(params) {
  return request({
    url: '/company/abnormalInformation',
    method: 'post',
    params
  })
}

export function fetchLimitProduction(params) {
  return request({
    url: '/company/limitProduction',
    method: 'post',
    params
  })
}
