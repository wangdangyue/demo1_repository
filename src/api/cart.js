// 购物车请求
import request from '@/utils/request'

// goodsId 商品id
// goodsSkuId 商品规格
// goodsNum  商品数量
// 加入购物车
export const cartAdd = ({ goodsId, goodsSkuId, goodsNum }) => {
  return request.post('/cart/add', {
    goodsId,
    goodsSkuId,
    goodsNum
  })
}
// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 更新购物车商品数量
export const updateCount = ({ goodsId, goodsSkuId, goodsNum }) => {
  return request.post('/cart/update', {
    goodsId,
    goodsSkuId,
    goodsNum
  })
}

// 删除购物车中商品
export const deleteCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
