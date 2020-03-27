import request from '@/utils/request'

export function fetchPermissions() {
  return request({
    url: '/permission/buttons',
    method: 'get'
  })
}
