<template>
  <div class="pay">
    <van-nav-bar title="订单结算台" left-arrow @click-left="$router.go(-1)" />
    <div class="pay_detail">
      <div class="adders">
        <div class="car_icon"><van-icon size="25px" name="location-o" /></div>
        <div class="center" v-if="address.name">
          <div class="name">
            <span>{{ address.name }}</span> <span>{{ address.phone }}</span>
          </div>
          <div class="adder">
            <span
              >{{ address.region.province }}{{ address.region.city
              }}{{ address.region.region }}{{ address.detail }}</span
            >
          </div>
        </div>
        <div class="more"><van-icon name="arrow" /></div>
      </div>
      <div class="line">
        <img
          v-for="item in 10"
          :key="item.id"
          src="@/assets/border-line.png"
          alt=""
        />
      </div>
      <div class="product">
        <div class="cart_list" v-for="item in goods" :key="item.goods_id">
          <div class="column_2"><img :src="item.goods_image" alt="" /></div>
          <div class="column_3">
            <div class="top text-ellipsis-2">
              {{ item.goods_name }}
            </div>
            <div class="bottom">
              <div class="count">x{{ item.total_num }}</div>
              <div class="price">￥{{ item.goods_price }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="total">
          共{{ total_count }}件商品,合计<span class="red"
            >￥{{ total_price }}</span
          >
        </div>
        <div class="discount">
          <ul>
            <li>
              <div>订单总金额</div>
              <div class="red">￥{{ total_price }}</div>
            </li>
            <li>
              <div>优惠券</div>
              <div>无优惠券可用</div>
            </li>
            <li>
              <div>配送费用</div>
              <div class="red">￥0</div>
            </li>
          </ul>
        </div>
        <div class="pay_type">
          <div class="title">支付方式</div>
          <div class="type">
            <div class="left">
              <van-icon size="22px" name="balance-o" />余额支付(可用￥9999.00元)
            </div>
            <div class="right red"><van-icon name="passed" /></div>
          </div>
        </div>
        <div class="message">
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="选填:买家备注(50字内)"
            show-word-limit
          />
        </div>
      </div>
    </div>
    <div class="bottom_btu">
      <van-submit-bar
        :price="total_price * 100"
        text-align="left"
        label="实付款"
        button-text="支付订单"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import { getAddersList } from '@/api/adders'
import { checkOrder, getOrderList, submitOrder } from '@/api/order'
export default {
  name: 'PayIndex',
  data () {
    return {
      orderid: '',
      address: {},
      goods: {},
      total_price: '',
      total_count: '',
      message: ''
    }
  },
  created () {
    this.getAddersList()
    this.getOrderId()
  },
  methods: {
    async getAddersList () {
      const {
        data: { list }
      } = await getAddersList()
      this.addersDetail = list[1]
    },
    mode () {
      return this.$route.query.mode
    },
    cartId () {
      return this.$route.query.cartId
    },
    goodsId () {
      return this.$route.query.goodsId
    },
    goodsNum () {
      return this.$route.query.goodsNum
    },
    goodsSkuId () {
      return this.$route.query.goodsSkuId
    },
    async getOrderId () {
      if (this.mode() === 'cart') {
        const {
          data: { orderId }
        } = await checkOrder(this.mode(), { cartIds: this.cartId() })
        this.orderid = orderId
        console.log(this.orderid)
      } else {
        const {
          data: { orderId }
        } = await checkOrder(this.mode(), {
          goodsId: this.goodsId(),
          goodsNum: this.goodsNum(),
          goodsSkuId: this.goodsSkuId()
        })
        this.orderid = orderId
      }
      this.getOrderList(this.orderid)
    },
    async getOrderList (id) {
      const {
        data: { order }
      } = await getOrderList(id)
      this.address = order.address
      this.goods = order.goods
      this.total_price = parseFloat(order.total_price)
      this.total_count = this.goods.reduce((sum, item) => item.total_num, 0)
    },
    onSubmit () {
      console.log('提交订单')
      this.$toast.success('支付成功')
      this.$router.replace('/myorder')
    },
    async onSubmit1 () {
      console.log('提交订单')

      if (this.mode() === 'cart') {
        await submitOrder(this.mode(), {
          cartIds: this.cartId(),
          remark: this.message
        })
      } else {
        await submitOrder(this.mode(), {
          goodsId: this.goodsId(),
          goodsNum: this.goodsNum(),
          goodsSkuId: this.goodsSkuId(),
          remark: this.message
        })
      }
      this.$toast.success('支付成功')
      this.$router.replace('/myorder')
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.pay {
  padding-bottom: 50px;
  width: 100%;
}
.adders {
  display: flex;
  padding: 10px 10px 0px;
  align-items: center;
  justify-content: space-between;
  color: #474747;

  .center {
    padding: 0 10px;
  }
}
.line {
  height: 3px;
  width: 100%;
  // background-color: pink;
  img {
    width: calc(100% / 10);
    height: 100%;
    object-fit: scale-down;
  }
}
//商品列
.product {
  padding-top: 20px;
}
.cart_list {
  background-color: #fff;
  width: 98%;
  height: 100px;
  margin: 0px auto 5px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 5px 5px;
  border-top: 1px solid #ededed;
  color: #474747;
  .column_2 {
    width: 100px;
    height: 100%;
    margin: 0 8px 0 2px;
    // background-color: pink;
    img {
      width: 100px;
      height: 100%;
      object-fit: scale-down;
    }
  }
  .column_3 {
    height: 100%;
    .top {
      margin: 10px 0;
      font-size: 15px;
    }
    .bottom {
      display: flex;
      font-size: 14px;
      justify-content: space-between;
      .price {
        color: red;
        // font-size: 20px;
      }
    }
  }
}
.content {
  color: #474747;
  padding: 0 10px;
  .total {
    width: 100%;
    text-align: right;
    border-bottom: 1px solid #cdcdcd;
    padding: 10px 0;
  }
  .discount {
    ul {
      width: 100%;
      height: 100%;
      // background-color: pink;
      li {
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    border-bottom: 1px solid #ededed;
  }

  .pay_type {
    height: 80px;
    border-bottom: 1px solid #ededed;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .type {
      display: flex;
      justify-content: space-between;
      letter-spacing: 1px;
    }
  }
  .message {
    color: #474747;
    padding: 10px 0;
  }
}
.red {
  color: #ff441a;
}
</style>
