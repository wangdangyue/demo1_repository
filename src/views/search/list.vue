<template>
  <div class="list">
    <van-nav-bar title="商品列表" left-arrow @click-left="$router.go(-1)" />
    <form action="/">
      <van-search
        shape="round"
        v-model="search"
        placeholder="请输入搜索关键词"
        clearable
        autofocus
        show-action
        maxlength="24"
        @search="goSearch(search)"
        @focus="$router.push('/search')"
      >
        <template #action>
          <div @click="$router.push('/category')">
            <van-icon name="apps-o" />
          </div>
        </template>
      </van-search>
    </form>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <div v-if="proList.length === 0" class="empty">

        <img src="@/assets/empty.png" alt="" /><br>
        没有搜索到该商品~~
      </div>
    </van-dropdown-menu>
    <div class="content"><GoodsItem
      v-for="item in proList"
      :key="item.goods_id"
      :item="item"
    ></GoodsItem></div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProList } from '@/api/product'
export default {
  name: 'searchList',
  components: { GoodsItem },
  data () {
    return {
      search: this.$route.query.search,
      page: '1',
      proList: [],
      value1: 'all',
      value2: 0,
      option1: [
        { text: '综合搜索', value: 'all' },
        { text: '销量搜索', value: 'sales' },
        { text: '价格搜索', value: 'price' }
      ],
      option2: [
        { text: '价格升序', value: 0 },
        { text: '价格降序', value: 1 }
      ]
    }
  },
  async created () {
    const res = await getProList({
      goodsName: this.querySearch,
      page: this.page
    })
    this.proList = res.data.list.data
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    }
  },
  methods: {
    goSearch (words) {
      // console.log(words)
    }
  }
}
</script>

<style lang="less" >
.list {
  background-color: #f7f8fa;
}
.empty {
  font-size: 20px;
  color: gray;
  text-align: center;
  background-color: #fff;
  padding-top: 100px;
  img{
    width: 150px;
  }
}
.van-icon-apps-o {
  font-size: 22px;
  vertical-align: middle;
}
.van-dropdown-menu {
  .van-dropdown-menu__bar {
    height: 8vw;
    box-shadow: 0 0vw 0vw rgba(0, 0, 0, 0.12);
  }
}
.content{
  padding: 0px 5px;
}
</style>
