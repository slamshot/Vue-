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

// 提交
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