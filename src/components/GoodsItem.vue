<template>
  <div v-if="item.goods_id" class="goodsitem" @click="$router.push(`/prodetail/${item.goods_id}`)">
    <div class="left"><img :src="item.goods_image" alt="" /></div>
    <div class="right">
      <div class="name text-ellipsis-2">
        <span>{{item.goods_name}}</span>
      </div>
      <div class="count gray">已售{{item.goods_sales}}件</div>
      <div class="price">
        <span class="priceNew">￥{{item.goods_price_max}}</span> &nbsp;<span class="gray"><s>￥{{item.line_price_max}}</s></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goodsitem {
  height: 120px;
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  .left {
    height: 100%;
    width: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    width: calc(100% - 130px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .name {
      height: 40px;
      font-size: 14px;
      font-family: 'SimHei';
    }
    // text-align: right;
  }
}
.gray{
    color: #B7B7B7;
}
.priceNew{
    font-size: 20px;
    font-weight: bold;
    color: red;
}
</style>
