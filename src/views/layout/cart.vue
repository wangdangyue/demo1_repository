<template>
  <div class="cart">
    <van-nav-bar title="购物车列表" left-arrow @click-left="$router.go(-1)" />

    <div v-if=" isLoading.length ===0 || cartTotal === 0" class="null">
    <div class="img"><img src="@/assets/empty.png" alt=""> </div>
    <div class="tip">您的购物车是空的，快去逛逛吧</div>
    <van-button @click="$router.push('/home')" round color="linear-gradient(to right, #ff6034, #ee0a24)">
        去逛逛
    </van-button>
    </div>
    <div v-else class="cart_all">
      <div class="hearder">
        <div class="left">
          共<span style="color: red">{{ cartList.length }}</span
          >件商品
        </div>
        <div class="right" @click="onEdit"><van-icon name="edit" />编辑</div>
      </div>

      <div class="cart_list" v-for="item in cartList" :key="item.goods_id">
        <div class="colunm_1">
          <van-checkbox
            @click="toggleCheck(item.goods_id)"
            :value="item.isChecked"
          ></van-checkbox>
        </div>
        <div class="column_2"><img :src="item.goods.goods_image" alt="" /></div>
        <div class="column_3">
          <div class="top text-ellipsis-2">
            {{ item.goods.goods_name }}
          </div>
          <div class="bottom">
            <div class="price">￥{{ item.goods.goods_price_max }}</div>
            <div class="count">
              <van-stepper
                default-value
                integer
                @input="updateCount(item.goods_id, item.goods_sku_id, $event)"
                :value="item.goods_num"
              />
            </div>
          </div>
        </div>
      </div>

      <van-submit-bar :price="selPrice * 100">
        <van-checkbox @click="checkedAll" v-model="checked"
          >全选({{ cartTotal }})</van-checkbox
        >
        <template #button>
          <button
            v-if="isEdit"
            class="sub_btu"
            :class="{ disable: selCount === 0 }"
            @click="onDelete"
          >
            删除({{ selCount }})
          </button>
          <button
            v-else
            class="sub_btu"
            :class="{ disable: selCount === 0 }"
            @click="onSubmit"
          >
            结算({{ selCount }})
          </button>
        </template>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CartPage',
  data () {
    return {
      checked: true,
      isEdit: false
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'selPrice', 'selCount', 'selCartList']),
    isLoading () {
      return this.$store.getters.token
    }
  },
  created () {
    if (this.isLoading) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
  methods: {
    toggleCheck (id) {
      this.$store.commit('cart/toggleCheck', id)
      this.checked = this.cartList.every((item) => item.isChecked)
    },
    checkedAll () {
      this.$store.commit('cart/checkedAll', this.checked)
    },
    async updateCount (id, skuId, e) {
      const obj = { goodsId: id, goodsSkuId: skuId, goodsNum: e }
      this.$store.dispatch('cart/updateCartAction', obj)
    },
    onEdit () {
      // 进入和退出编辑状态
      this.isEdit = !this.isEdit
      this.$store.commit('cart/checkedAll', !this.isEdit)
      this.checked = !this.isEdit
    },
    onDelete () {
      // 删除商品
      if (this.selCount === 0) return
      this.$store.dispatch('cart/deleteCartAction')
    },
    onSubmit () {
      if (this.selCount === 0) return
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'cart',
          cartId: this.selCartList.map(item => item.id).join(',')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  padding-bottom: 50px;
}
.cart_all {
  background-color: #f4f4f4;
  padding-top: 5px;

  .hearder {
    display: flex;
    justify-content: space-between;
    padding: 5px 5px;
  }
}
.cart_list {
  background-color: #fff;
  width: 98%;
  height: 130px;
  margin: 0px auto 5px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 15px 5px;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .bottom {
      display: flex;
      justify-content: space-between;
      .price {
        color: red;
        font-size: 20px;
      }
    }
  }
}
.sub_btu {
  border: none;
  padding: 10px 15px;
  color: #fff;
  background-color: #fa482f;
  border-radius: 20px;
}
.disable {
  background-color: #ff9e75;
}
.null{
  width: 100%;
  height: 400px;
  // background-color: orange;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img{
    width: 200px;
    height: 150px;
   margin-top: 100px;
    img{
      height: 100%;
      width: 100%;
      object-fit: scale-down;
    }
  }
  .tip{
    margin: 20px 0;
    font-size: 20px;color: gray;
  }
  .van-button--normal {

    letter-spacing: 2px;
  }
}

</style>
