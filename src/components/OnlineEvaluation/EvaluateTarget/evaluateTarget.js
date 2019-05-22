import request from '@/utils/request'
/* 主表接口 */
export function getList(currentPage,pageSize,orders,filters){
    return request({
        url: '/evaluateTarget/gets',
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
        url: '/evaluateTarget',
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
        url: '/evaluateTarget/get/'+pkid,
        method: 'GET'
    })
}

export function deleted(pkid){
    return request({
        url: '/evaluateTarget/delete/'+pkid,
        method: 'DELETE'
    })
}

export function getEvaluateTargetByEvaluKind(evaluKind){
    return request({
        url: '/evaluateTarget/getByEvaluKind',
        params:{
            evaluKind
        },
        method: 'GET'
    })
}

export function exportTarget(){
    // return request({
    //     url: '/evaluateTarget/exportTarget',
    //     method: 'GET'
    // })
    window.open('http://10.214.92.37:7576/evaluateTarget/exportTarget','_self')
}

