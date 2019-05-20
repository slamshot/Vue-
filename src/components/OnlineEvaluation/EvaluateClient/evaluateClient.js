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

export function save(data){
    return request({
        url: '/evaluateClient',
        data:JSON.stringify(data),
        method: 'POST',
        transformRequest: [(data) => {
            return data
        }],
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function get(id){
    return request({
        url: '/evaluateClient/get/'+id,
        method: 'GET'
    })
}

export function deleted(id){
    return request({
        url: '/evaluateClient/delete/'+id,
        method: 'DELETE'
    })
}

/**
 * 获取计划类别的当前计划
 * @param {*计划类别} evaluKind 
 */
export function getCurrentEvaluate(evaluKind){
    return request({
        url: '/evaluatePlan/current',
        params:{
            evaluKind:'内部顾客满意度测评'
        },
        method: 'GET'
    })
}