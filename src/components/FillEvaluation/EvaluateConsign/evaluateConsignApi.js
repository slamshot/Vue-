import request from '@/utils/request'

// 保存委托信息
export function saveConsignInfo(data){
  return request({
      url: '/evaluateClientList/saveConsignInfo',
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