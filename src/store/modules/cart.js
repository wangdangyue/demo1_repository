import { getCartList, updateCount, deleteCart } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newlist) {
      state.cartList = newlist
    },
    toggleCheck (state, id) {
      state.cartList.forEach(item => {
        if (id === item.goods_id) {
          item.isChecked = !item.isChecked
        }
      })
    },
    checkedAll (state, checked) {
      state.cartList.forEach(item => {
        item.isChecked = checked
      })
    },
    updateCartNum (state, { id, e }) {
      state.cartList.forEach(item => {
        if (id === item.goods_id) { item.goods_num = e }
      })
    },
    delateCartId (state, arrCartId) {
      state.cartList = state.cartList.filter(item => (arrCartId.indexOf(item.id) === -1))
    }
  },
  actions: {
    // 获取购物车数据
    async getCartAction (context) {
      const { data: { list } } = await getCartList()
      list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', list)
    //   console.log(list)
    },
    // 更新购物车数据
    async updateCartAction (context, obj) {
      const res = await updateCount(obj)
      if (res.status === 200) {
        context.commit('updateCartNum', { id: obj.goodsId, e: obj.goodsNum })
      }
    },
    // 删除购物车数据
    async   deleteCartAction (context) {
      const selCartList = context.getters.selCartList
      const cartIds = []
      selCartList.forEach(item => {
        cartIds.push(item.id)
      })

      const res = await deleteCart(cartIds)
      if (res.status === 200) {
        context.commit('delateCartId', cartIds)
      }
    }

  },
  getters: {
    // 所有商品累加总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的商品累加总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品累加总价格
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_max, 0)
    }
  }
}
