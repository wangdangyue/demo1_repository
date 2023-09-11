<template>
  <div class="prodetail">
    <van-nav-bar title="商品详情" left-arrow @click-left="$router.go(-1)" />
    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.external_url" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ images.length }}
        </div>
      </template>
    </van-swipe>

    <div class="details">
      <div class="row1">
        <div class="price">
          <div class="new_price">￥{{ detail.goods_price_max }}</div>
          &nbsp;&nbsp;&nbsp;
          <div class="old_price">
            <s>￥{{ detail.line_price_max }}</s>
          </div>
        </div>
        <div class="count">已售{{ detail.goods_sales }}件</div>
      </div>
      <div class="name text-ellipsis-2">
        {{ detail.goods_name }}
      </div>
      <div class="row3">
        <div class="left">
          <div><van-icon name="passed" />七天无理由退货</div>
          &nbsp;&nbsp;
          <div><van-icon name="passed" />48小时发货</div>
        </div>
        <div class="right"><van-icon name="arrow" /></div>
      </div>
    </div>
    <div class="rate">
      <div class="title">
        <div class="left">商品评价(5条)</div>
        <div class="right" style="color: gray">
          查看更多 <van-icon name="arrow" />
        </div>
      </div>
      <div class="content" v-for="item in list" :key="item.comment_id">
        <div class="row1">
          <img :src="item.user.avatar_url || defaultImg" alt="" />
          <div class="name">{{ item.user.nick_name }}</div>
          <div class="star">
            <van-rate
              :value="item.score / 2"
              :size="12"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
        </div>
        <div class="row2">{{ item.content }}</div>
        <div class="row3">{{ item.create_time }}</div>
      </div>
    </div>
    <div class="pro_img">
      <img :src="detail.goods_image" alt="" />
    </div>
    <van-goods-action>
      <van-goods-action-icon
        @click="$router.push('/home')"
        icon="wap-home-o"
        text="首页"
      />
      <van-goods-action-icon :badge =cartTotal
        @click="$router.push('/cart')"
        icon="cart-o"
        text="购物车"
      />
      <van-goods-action-button
        @click="addFn"
        color="#FF9C19"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button
        @click="buyNew"
        color="##F7362C"
        type="danger"
        text="立即购买"
      />
    </van-goods-action>
    <van-action-sheet
      v-model="show"
      :title="mode === 'car' ? '加入购物车' : '立即购买'"
    >
      <div class="content1">
        <div class="row1">
          <div class="left">
            <img :src="detail.goods_image" alt="" />
          </div>
          <div class="right">
            <div class="price">￥{{ detail.goods_price_max }}</div>
            <div class="count">库存{{ detail.stock_total }}</div>
          </div>
        </div>
        <div class="row2">
          <div class="left">数量</div>
          <div class="right"><van-stepper v-model="num" /></div>
        </div>
        <div class="show_btu" v-if="detail.stock_total > 0">
          <van-button
            v-if="mode == 'car'"
            type="primary"
            block
            round
            color="#FF9702"
            @click="addCart"
            >加入购物车</van-button
          >
          <van-button
            v-else
            type="primary"
            block
            round
            color="#F6322B"
            @click="addBuy"
            >立即购买</van-button
          >
        </div>
        <van-button v-else type="primary" block round color="#E8E8E8"
          >商品已售罄</van-button
        >
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getProDeatil, getProReta } from '@/api/product'
import defaultImg from '@/assets/default-avatar.png'
import { cartAdd, getCartList } from '@/api/cart'
import { Toast } from 'vant'
import loginConfirm from '@/mixins/loginConfirm'
export default {
  name: 'ProdetailIndex',
  mixins: [loginConfirm],
  data () {
    return {
      goodsid: '',
      num: 1,
      mode: '',
      current: 0,
      images: [],
      detail: {},
      list: [],
      defaultImg: defaultImg,
      show: false,
      cartTotal: 0
    }
  },
  async created () {
    this.goodsid = this.$route.params.id
    const {
      data: { detail }
    } = await getProDeatil(this.goodsid)
    this.images = detail.goods_images
    this.detail = detail
    // console.log(detail)

    const {
      data: { list }
    } = await getProReta(this.goodsid)
    this.list = list
    // console.log(list)
    // 获取购物车数量

    // 判断是否登录
    if (!this.$store.getters.token) {
      return
    }
    const { data: { cartTotal } } = await getCartList()
    this.cartTotal = cartTotal
  },
  methods: {
    onClickIcon () {
      // Toast('点击图标')
    },
    onClickButton () {
      // Toast('点击按钮')
    },
    onChange (index) {
      this.current = index
    },
    // 弹出商品弹窗
    addFn () {
      this.show = true
      this.mode = 'car'
    },
    buyNew () {
      this.show = true
      this.mode = 'buyNew'
    },
    // 确定添加
    async addCart () {
      // 判断token是否存在
      // 不存在
      if (!this.loginConfirm()) {
        return
      }

      // console.log('请求接口,加入购物车')
      // console.log({ goodsId: this.goodsid, goodsSkuId: this.detail.skuList[0].goods_sku_id, goodsNum: this.num })
      const res = await cartAdd({ goodsId: this.goodsid, goodsSkuId: this.detail.skuList[0].goods_sku_id, goodsNum: this.num })
      if (res.status === 200) {
        Toast(res.message)
        this.show = false
        this.cartTotal = res.data.cartTotal
      }
    },
    addBuy () {
      // 判断token是否存在
      // 不存在
      if (!this.loginConfirm()) {
        return
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsid,
          goodsNum: this.num,
          goodsSkuId: this.detail.skuList[0].goods_sku_id
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.prodetail {
  background-color: #f4f2f2;
  padding-bottom: 50px;
  // height: 100px;
}
.van-swipe {
  width: 100%;
  height: 300px;
  padding: 0 5px;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
  }
}

.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
.details {
  width: 100%;
  height: 130px;
  padding: 0 5px;
  margin: 5px 40px 5px 5px;
  border-radius: 10px;
  background-color: #fff;
  .row1 {
    display: flex;
    justify-content: space-between;
    align-items: end;
    .price {
      display: flex;
      align-items: end;
      .new_price {
        color: red;
        font-size: 25px;
      }
      .old_price {
        color: gray;
        font-size: 18px;
      }
    }
    .count {
      color: gray;
      font-size: 18px;
    }
  }
  .name {
    margin-top: 10px;
    height: 45px;
    font-size: 16px;
    font-family: "SimHei";
  }
  .row3 {
    color: gray;
    font-size: 16px;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: end;
    .left {
      display: flex;
    }
  }
}

.van-icon-passed:before {
  color: #f8754a;
  margin-right: 3px;
}
.rate {
  background-color: #fff;
  margin: 5px;
  .title {
    background-color: #fff;

    display: flex;
    justify-content: space-between;
    padding: 5px 5px 10px 5px;
    font-size: 16px;
    // background-color: pink;
    font-weight: bold;
  }
  .content {
    background-color: #fff;
    margin-bottom: 2px;
    border-bottom: 1px solid #ededed;
    padding: 5px 5px;
    .row1 {
      display: flex;
      align-items: center;
      img {
        width: 30px;
      }
      .name {
        font-size: 16px;
        margin: 0 5px;
      }
    }
  }
  .row2 {
    font-size: 18px;
    padding: 10px 0 5px 0;
  }
  .row3 {
    padding: 5px 0px;
    color: gray;
    font-size: 14px;
  }
}
.pro_img {
  width: 100%;
  img {
    width: 100%;
  }
}
.content1 {
  padding: 0px 16px 10px;
  .row1 {
    width: 100%;
    height: 100px;
    // background-color: pink;
    display: flex;
    flex-direction: row;
    .left {
      width: 30%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .right {
      padding-left: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .price {
        color: red;
        font-size: 20px;
      }
    }
  }
  .row2 {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
}
.van-goods-action-icon__icon {
  font-size: 30px !important;
}
</style>
