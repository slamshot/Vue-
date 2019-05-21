import request from '@/utils/request'
/* 获取在线评价列表 */
export function clientList(id){
    return request({
        url: '/evaluateClientList/clientList',
        params:{
            evaluateId:id,
        },
        method: 'GET'
    })
}

// 删除
export function deletePeople(pkid){
    return request({
        url: '/evaluateClientList/delete/'+pkid,
        method: 'GET'
    })
}

// 获取年度下拉框
export function gets(){
    return request({
        url: '/evaluatePlan/gets',
        data:{
            filters:JSON.stringify({flag:3})
        },
        method: 'POST',
    })
}

// 获取年度任务
export function getByYear(data){
    return request({
        url: '/evaluateClientStatis/task/getByYear',
        params:data,
        method: 'GET',
        // transformRequest: [(data) => {
        //     return data
        // }],
        // headers: {
        //     'Content-Type': 'application/json;charset=UTF-8'
        // }
    })
}

// 获取具体指标下拉框数据
export function getByEvaluKind(data){
    return request({
        url: '/evaluateTarget/getByEvaluKind',
        params:{evaluKind:data},
        method: 'GET',
    })
}

// 导出
export function exportExcel(data){
    return request({
        url: '/evaluateClientStatis/exportExcel',
        data:JSON.stringify({filterMap:data}),
        method: 'POST',
        transformRequest: [(data) => {
            return data
        }],
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

// // state:提交0,暂存1    被委托人的信息
// export function saveConsignFillContent(data){
//     return request({
//         url: '/evaluateClientList/saveConsignFillContent',
//         data:JSON.stringify(data),
//         method: 'POST',
//         transformRequest: [(data) => {
//             return data
//         }],
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8'
//         }
//     })
// }

// // 查看，获取填写内容
// export function getFillContent(id){
//     return request({
//         url: '/evaluateClientList/getFillContent',
//         method: 'GET',
//         params:{
//             evaluateListPKID:id
//         }
//     })
// }

// // 获取指定评价指标信息
// export function getTargetItem(pkid){
//     return request({
//         url: '/evaluateTarget/get/'+pkid,
//         method: 'GET',
//     })
// }