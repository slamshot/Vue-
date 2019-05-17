import request from '@/utils/request'
/* 主表接口 */
export function getList(currentPage,pageSize,orders,filters){
    return request({
        url: '/evaluateClient/gets',
        data:{
            currentPage,
            pageSize,
            orders:JSON.stringify(orders),
            filters:JSON.stringify(filters)
        },
        method: 'POST'
    })
}

// 删除
export function deleted(id){
    return request({
        url: '/evaluateClient/delete/'+id,
        method: 'DELETE'
    })
}

//废弃计划
export function discard(id){
    return request({
        url: '/evaluateClient/discard/'+id,
        method: 'DELETE'
    })
}
