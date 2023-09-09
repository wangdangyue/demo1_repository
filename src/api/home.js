import request from '@/utils/request'
// 用于存放所有home页相关的接口请求

export const getHomeDetail = () => {
  return request.get('/page/detail')
}
