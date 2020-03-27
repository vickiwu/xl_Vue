import request from '@/utils/request'

export function fetchOperationStateList(params) {
  return request({
    url: '/operationState/statistics',
    method: 'post',
    params
  })
}

export function fetchOperationCompanyList(params) {
  return request({
    url: '/operationState/companyList',
    method: 'post',
    params
  })
}

export function fetchOperationSelect() {
  return request({
    url: '/operationState/select',
    method: 'get'
  })
}

/**
 * 获取运行状况分析表格头部条件筛选项
 * @param {*} params 请求参数
 */
export function fetchOperationSelectOptions(params) {
  return request({
    url: '/operationState/selectOptions',
    method: 'post',
    params
  })
}

