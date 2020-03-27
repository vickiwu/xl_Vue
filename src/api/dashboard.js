import request from '@/utils/request'

export function fetchCardList() {
  return request({
    url: '/home/cardList',
    method: 'get'
  })
}
