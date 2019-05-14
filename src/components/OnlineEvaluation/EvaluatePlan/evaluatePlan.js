import request from '@/utils/request'
/* 主表接口 */
// 获取列表
export function getList(currentPage,pageSize,orders,filters){
    return request({
        url: '/evaluatePlan/getEvaluatePlanList',
        data:{
            currentPage,
            pageSize,
            orders:JSON.stringify(orders),
            filters:JSON.stringify(filters)
        },
        method: 'POST',
    })
}

//提交
export function save(data){
    return request({
        url: '/evaluatePlan/saveEvaluatePlan',
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

// 获取单个
export function get(pkid){
    return request({
        url: '/evaluatePlan/getEvaluatePlanByPkid',
        data:{
            pkid
        },
        method: 'POST'
    })
}

// 删除
export function deleted(pkid){
    return request({
        url: '/evaluatePlan/deleteEvaluatePlan',
        data:{
            pkid
        },
        method: 'POST'
    })
}
// 完成计划
export function complete(pkid){
    return request({
        url: '/evaluatePlan/completeEvaluatePlan',
        data:{
            pkid
        },
        method: 'POST'
    })
}