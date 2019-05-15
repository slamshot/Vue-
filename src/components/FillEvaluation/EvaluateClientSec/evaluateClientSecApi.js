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

// 查看，获取填写内容
export function getFillContent(id){
    return request({
        url: '/evaluateClientList/getFillContent',
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