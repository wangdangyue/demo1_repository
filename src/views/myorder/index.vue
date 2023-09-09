<template>

  <div  class="myorder">
    <div class="header">
      <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    </div>
    <div class="tab">
      <van-tabs v-model="active" @click="onClick">
        <van-tab title="全部" name="all"></van-tab>
        <van-tab title="待支付" name="payment"></van-tab>
        <van-tab title="待发货" name="delivery"></van-tab>
        <van-tab title="待收货" name="received"></van-tab>
        <van-tab title="待评价" name="comment"></van-tab>
      </van-tabs>
    </div>

    <div  v-if="total===0" class="null">
    <img src="@/assets/empty.png" alt=""><br>
    没有订单信息
  </div>

   <div v-else class="main">
    <div  class="order_list">
      <OrderListItem
        v-for="item in orderList"
        :key="item.order_id"
        :item="item"
      ></OrderListItem>
    </div>

    <div class="footer">
      <van-pagination
        @change="onClick"
        v-model="currentPage"
        :page-count="last_page"
        :total-items="total"
        :items-per-page="per_page"
      />
    </div>
   </div>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getMyOrderList } from '@/api/order'
export default {
  name: 'MyOrder',
  components: { OrderListItem },
  data () {
    return {
      currentPage: 1,
      active: this.$route.query.dataType || 'all',
      orderList: [],
      last_page: 0,
      per_page: 0,
      total: 0
    }
  },
  created () {
    this.onClick()
  },
  methods: {
    async onClick () {
      console.log(this.currentPage)
      const res = await getMyOrderList(this.active, this.currentPage)
      this.orderList = res.data.list.data
      this.last_page = res.data.list.last_page
      this.per_page = res.data.list.per_page
      this.total = res.data.list.total
      console.log(res)
      console.log(res.data.list.data)
      // this.orderList.forEach(async item => {
      //   const res = await cancelOrder(item.order_id)
      //   console.log(res)
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.myorder{
  background: #FAFAFA;
}
.header {
  width: 100%;
  position: sticky;
  top: 0px;
  left: 0px;
}
.footer {
  width: 100%;
  position: sticky;
  left: 0px;
  bottom: 0px;
}
// .order_list{
//   padding-bottom: 50px;
// }
.null{
width: 200px;
margin: 150px auto 0px;
padding-bottom: 300px;
color: gray;
// background-color: #fff;
img{
  width: 100%;
  height: 100%;
}
}
</style>
