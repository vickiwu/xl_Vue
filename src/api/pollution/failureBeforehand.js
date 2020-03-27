import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/failureBeforehand/list',
    method: 'post',
    params
  })
}

export function fetchStatus(params) {
  return request({
    url: '/failureBeforehand/list',
    method: 'get',
    params
  })
}

export function fetchReviewStatus(params) {
  return request({
    url: '/failureBeforehand/status',
    method: 'get',
    params
  })
}

export function fetchReviewDetail(params) {
  return request({
    url: '/failureBeforehand/detail',
    method: 'get',
    params
  })
}
