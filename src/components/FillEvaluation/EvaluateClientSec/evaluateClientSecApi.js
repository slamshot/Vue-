import request from '@/utils/request'
/* 获取填写评价表 */
export function evaluateContent(id){
    return request({
        url: '/evaluateClient/evaluateContent',
        params:{
          id,
        },
        method: 'GET'
    })
}

// state:提交0,暂存1
export function saveFillContent(data){
    return request({
        url: '/evaluateClientList/saveFillContent',
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
// state:提交0,暂存1    被委托人的信息
export function saveConsignFillContent(data){
    return request({
        url: '/evaluateClientList/saveConsignFillContent',
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

// 查看，获取填写内容（不是委托的）
export function getFillContent(id){
    return request({
        url: '/evaluateClientList/getFillContent',
        method: 'GET',
        params:{
            evaluateListPKID:id
        }
    })
}

// 查看，获取填写内容（委托的）
export function getConsignFillContent(id){
    return request({
        url: '/evaluateClientList/getConsignFillContent',
        method: 'GET',
        params:{
            evaluateListPKID:id
        }
    })
}

// 获取指定评价指标信息
export function getTargetItem(pkid){
    return request({
        url: '/evaluateTarget/get/'+pkid,
        method: 'GET',
    })
}