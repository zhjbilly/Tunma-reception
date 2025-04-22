import request from '@/utils/request'

// 获取藏品分类列表
export function getFenleiList(params) {
  return request({
    url: '/shenxiu/fenlei/list',
    method: 'get',
    params
  })
}

// 获取仓储列表
export function getCangchuList(params) {
  return request({
    url: '/shenxiu/cangchu/list',
    method: 'get',
    params
  })
}

// 获取藏品列表
export function getCangpinList(params) {
  return request({
    url: '/shenxiu/cangpin/list',
    method: 'get',
    params
  })
}

// 获取藏品流动信息
export function getLiudongList(params) {
  return request({
    url: '/shenxiu/liudong/list',
    method: 'get',
    params
  })
}

// 获取藏品详情
export function getCangpinDetail(id) {
  return request({
    url: `/shenxiu/cangpin/${id}`,
    method: 'get'
  })
} 