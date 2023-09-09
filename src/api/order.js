import request from '@/utils/request'

// 订单结算 获得订单编号
export const checkOrder = (mode, obj) => {
  return request.post('/checkout/order',
    {
      mode, // cart购物车下单 =>{cartIds}，buyNow立刻购买=>{goodsId,goodsNum,goodsSkuId}
      delivery: 10, // 10快递 20门店自提
      couponId: 0, // 优惠券id
      isUsePoints: 0, // 是否使用积分
      // // goodsId: '10038', //购物车下单无需传递商品id
      // // goodsNum: '1',  // 购物车下单无需传递商品数量
      // // goodsSkuId: '0' //购物车下单无需传递商品规格
      // // cartIds, //商品页下单无需传递  购物车id
      ...obj
    }
  )
}

// 查询订单内容
export const getOrderList = (orderId) => {
  return request.post('/order/detail', {
    orderId: orderId
  })
}

// 提交订单
export const submitOrder = (mode, obj) => {
  console.log(mode, obj)
  return request.post('/checkout/submit', {
    mode: mode, // cart购物车下单 =>{cartIds}，buyNow立刻购买=>{goodsId,goodsNum,goodsSkuId}
    delivery: 10, // 10快递 20门店自提
    couponId: 0, // 优惠券id
    isUsePoints: 0, // 是否使用积分
    payType: 10,
    // // goodsId: '10038', //购物车下单无需传递商品id
    // // goodsNum: '1',  // 购物车下单无需传递商品数量
    // // goodsSkuId: '0' //购物车下单无需传递商品规格
    // // cartIds, //商品页下单无需传递  购物车id
    ...obj
  })
}

// 获取我的订单
export const getMyOrderList = (dataType, page) => {
  return request.post('/order/list', {
    dataType,
    page
  })
}

// 取消订单
export const cancelOrder = (orderId) => {
  return request.post('/order/cancel', {
    orderId
  })
}
