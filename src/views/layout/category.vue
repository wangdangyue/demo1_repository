<template>
  <div class="cate">
    <van-nav-bar title="全部分类" left-arrow @click-left="$router.go(-1)" />
    <van-search @focus="$router.push('/search')"
      v-model="value"
      shape="round"
      background="#F7F8FA"
      placeholder="请输入搜索关键词"
    />
    <div class="main">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item :title="item.name" v-for="item in cateList" :key="item.category_id" />
      </van-sidebar>
      <div class="right">
        <ul>
          <li @click="$router.push(`/searchlist?search=${i.name}`)" v-for="i in cateList[activeKey].children" :key="i.category_id">
            <img :src="i.image.external_url" alt="" />
            <span>{{i.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getCateGoryData } from '@/api/category'
export default {
  name: 'CategoryPage',
  data () {
    return {
      value: '',
      activeKey: 0,
      cateList: [{ children: '' }]
    }
  },
  async created () {
    const { data: { list } } = await getCateGoryData()

    this.cateList = list
    // console.log(list)
  }
}
</script>

<style lang="less" scoped>
.cate{
  padding-bottom: 50px;

}
.main {
  height: 580px;
  display: flex;
  flex-direction: row;
}
.right {
  height: 100%;
  width: calc(100% - 80px);
  overflow-y: scroll; // 设置纵向滚动效果，x为横向
  ul {

    li {
      float: left;
      width: calc(100% / 3);
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100px;
      }
      span {
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    }
  }
}
.van-sidebar {
  height: 100%;
  overflow-y: scroll; // 设置纵向滚动效果，x为横向
}
.van-sidebar-item--select {
  color: red;
  font-weight: bold;
}
.van-sidebar-item--select::before {
  // position: absolute;
  // top: 50%;
  // left: 0;
  // width: 1.06667vw;
  // height: 4.26667vw;
  width: 0vw;
  height: 0vw;
  // background-color: #ee0a24;
  // -webkit-transform: translateY(-50%);
  // transform: translateY(-50%);
  content: "";
}
.van-cell--borderless {
  border: 2px solid #edeef0;
  border-radius: 50px;
}
</style>
