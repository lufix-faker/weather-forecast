import {request, request2, request4, request6} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: 'home/data',
    params: {
      type,
      page
    }
  })
}

/* 模拟数据 */
// export function getHomeGoods(type, page) {
//   return request2({
//     url: 'eduservice/course/courseQueryCondition/0/8',
//     method: 'post'
//   })
// }

// 模拟home数据
export function getMockHomeGoods(type, page) {
  return request4({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

