import axios from 'axios'
import Qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 500000, // 请求超时时间
  transformRequest: [(data) => {
    data = Qs.stringify(data) // 序列化参数
    return data
  }],
  withCredentials: true,
  validateStatus: (status) => {
    return true // 默认的
  },
  cancelToken: new axios.CancelToken((cancel) => {})
})

// request拦截器
service.interceptors.request.use(config => {
  return config;
}, error => {

})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {

  }
)

export default service
