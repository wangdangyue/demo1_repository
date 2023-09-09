<template>
  <div>
    <router-view></router-view>
    <!-- 二级路由出口:展示区域 -->
  <van-tabbar v-model="active" route active-color="#0DBC79" inactive-color="#000">
  <van-tabbar-item  replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
  <van-tabbar-item  replace to="/category" icon="apps-o">分类页</van-tabbar-item>
  <van-tabbar-item  replace to="/cart" icon="shopping-cart-o" :badge="cartTotal">购物车</van-tabbar-item>
  <van-tabbar-item  replace to="/user" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
import { getCartList } from '@/api/cart'
import loginConfirm from '@/mixins/loginConfirm'
export default {
  name: 'LayoutIndex',
  mixins: [loginConfirm],
  data () {
    return {
      active: 0,
      cartTotal: 0
    }
  },
  async created () {
    // 判断是否登录
    if (!this.$store.getters.token) {
      return
    }
    const { data: { cartTotal } } = await getCartList()
    this.cartTotal = cartTotal
  }
}
</script>

<style>

</style>
