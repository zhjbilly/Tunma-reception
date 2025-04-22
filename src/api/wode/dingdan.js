import request from '@/utils/request'

// 查询订单列表
export function listDingdan(query) {
    return request({
        url: '/qiche/dingdan/list',
        method: 'get',
        params: query
    })
}

// 查询订单详细
export function getDingdan(id) {
    return request({
        url: '/qiche/dingdan/' + id,
        method: 'get'
    })
}

// 新增订单
export function addDingdan(data) {
    return request({
        url: '/qiche/dingdan',
        method: 'post',
        data: data
    })
}

// 修改订单
export function updateDingdan(data) {
    return request({
        url: '/qiche/dingdan',
        method: 'put',
        data: data
    })
}

// 删除订单
export function delDingdan(id) {
    return request({
        url: '/qiche/dingdan/' + id,
        method: 'delete'
    })
}

export function physicalInterface(url) {
    return request({
        url: url,
        method: 'get'
    })
}
