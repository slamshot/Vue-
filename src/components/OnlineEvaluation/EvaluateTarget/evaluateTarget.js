import request from '@/utils/request'
/* 主表接口 */
export function getList(currentPage,pageSize,orders,filters){
    return request({
        url: '/evaluateTarget/getEvaluateTargetList',
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
        url: '/evaluateTarget/saveEvaluateTarget',
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

export function get(pkid){
    return request({
        url: '/evaluateTarget/getEvaluateTargetByPkid',
        data:{
            pkid
        },
        method: 'POST'
    })
}

export function deleted(pkid){
    return request({
        url: '/evaluateTarget/deleteEvaluateTarget',
        data:{
            pkid
        },
        method: 'POST'
    })
}

export function getEvaluateTargetByEvaluKind(evaluKind){
    return request({
        url: '/evaluateTarget/selectEvaluateTarget',
        data:{
            evaluKind
        },
        method: 'POST'
    })
}

