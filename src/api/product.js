import request from '@/utils/request'
// 用于拿取搜索商品
export const getProList = (obj) => {
  return request.post('/goods/list', {
    goodsName: obj.goodsName,
    page: obj.page
  })
}

// 获取商品详情
export const getProDeatil = (goodsid) => {
  return request.post('/goods/detail', {
    goodsId: goodsid
  })
}

// 获取商品评价
export const getProReta = (goodsid) => {
  return request.post('/comment/listRows', {
    goodsId: goodsid,
    limit: 5
  })
}
