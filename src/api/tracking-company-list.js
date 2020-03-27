import request from '@/utils/request'

export function fetchBusinessList(params) {
  return request({
    url: '/abnormal/companyList',
    method: 'post',
    params
  })
}

export function fetchIndustryList(query) {
  return request({
    url: '/abnormal/industryList',
    method: 'post',
    params: query
  })
}

export function fetchCompantList(query) {
  return request({
    url: './company/list',
    method: 'post',
    params: query
  })
}
