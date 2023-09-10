<template>
  <div class="home">
    <van-nav-bar title="网上商城">
      <template #left>
        <van-icon name="wap-home" size="18" color="#0DBC79" />
      </template>
    </van-nav-bar>
    <!-- 搜索框 -->
    <form action="/">
  <van-search
    shape="round"
    v-model="value"
    placeholder="请输入搜索关键词"
    clearable
    @focus="$router.push('/search')"
  >

</van-search >
</form>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="1000" indicator-color="white">
  <van-swipe-item @click="$router.push('/searchlist?search=餐')"><img src="@/assets/banner1.webp" alt=""> </van-swipe-item>
  <van-swipe-item @click="$router.push('/searchlist?search=美')"><img src="@/assets/banner2.webp" alt=""> </van-swipe-item>
  <van-swipe-item @click="$router.push('/searchlist?search=茶')"><img src="@/assets/banner3.webp" alt=""> </van-swipe-item>
</van-swipe>

<!-- 导航格子 -->
<div class="grid">
  <ul>
    <li  @click="$router.push('/category')" v-for="(item) in navBar"  :key="item.id">
    <img :src="item.imgUrl" alt=""><br>
    <span>{{item.text}}</span>
    </li>
  </ul>
</div>
<!-- 图片 -->
<div class="main">
  <img :src="image" alt="">
</div>
<span class="guessLike"></span>
<!-- goodsitem组件 -->
<GoodsItem v-for="item in goods" :key="item.goods_id" :item="item"></GoodsItem>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem'
import { getHomeDetail } from '@/api/home'
export default {
  name: 'HomePage',
  components: { GoodsItem },
  data () {
    return {
      value: '',
      list: [],
      navBar: [],
      image: '',
      richText: '',
      goods: []
    }
  },
  async created () {
    const res = await getHomeDetail()

    const items = res.data.pageData.items
    this.navBar = items[3].data
    this.image = items[4].data[0].imgUrl
    this.richText = items[5].params.content
    this.goods = items[6].data
    // console.log(res.data.pageData.items)
  }

}
</script>

<style lang="less" scoped>
.home{
  padding:0 5px;
  background-color: #F7F8FA;
  padding-bottom: 50px;
}
.my-swipe{
  width: 100%;
  height: 180px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
}
.grid{
  margin-top: 10px;
  width: 100%;
    height: 110px;
  ul{
    width: 100%;
    height: 100%;
    li{
      width: calc(100% / 5);
      height: calc(100% / 2);
      float: left;
      border: 1px solid #FDFDFD;
      text-align: center;
      img{
        width: 80%;
    height: 60%;
    object-fit: scale-down;
      }
      span{
        font-size: 12px;
        color: #939192;
      }
      // background-color: green;
    }
  }
}
.main{
  width: 100%;
  height: 100px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
