<template>
  <div class="Searhindex">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />
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
      >
        <template #action>
          <div @click="goSearch(search)">搜索</div>
        </template>
      </van-search>
    </form>
    <div v-if="history.length>0" class="recently">
      <div class="title">
        <div class="left">最近搜索</div>
        <div @click="clear" class="right"><van-icon name="delete" /></div>
      </div>
      <span v-for="item,index in history" :key="index" class="list" >
      <span @click="goSearch(item)">{{ item }}</span>
      <div><van-icon name="cross" @click="clearword(item)" /></div>
      </span>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'SearhIndex',
  data () {
    return {
      search: '',
      history: getHistoryList()
    }
  },
  methods: {
    goSearch (words) {
      if (!words.trim()) return
      const index = this.history.indexOf(words)
      if (index !== -1) {
        this.history.splice(index, 1)
      }

      this.history.length = this.history.length > 9 ? 9 : this.history.length
      this.history.unshift(words)
      setHistoryList(this.history)
      this.$router.push(`/searchlist?search=${words}`)
    },
    clearword (words) {
      const index = this.history.indexOf(words)
      this.history.splice(index, 1)

      setHistoryList(this.history)
    },
    clear () {
      this.history = []
      setHistoryList([])
    }
  }
}
</script>

<style lang="less" scoped>
.Searhindex {
  padding: 0 5px;
}
.recently {
  width: 100%;
  height: 140px;
  // background-color: pink;
  .list {
    border:1px solid #dcdddf;
    font-size: 13px;
    display: inline-block;
    padding: 5px 2px 3px 10px;
    margin: 5px 3px;
    border-radius: 50px;
    span{

    display: inline-block;
    margin-right: 5px;

    }
    div{
      float: right;
      width: 20px;
      height: 20px;
      text-align: center;
      padding: 2px 0px;
      border-radius: 10px;
      // background-color: #ebecef;
    }

  }
  .title {
    display: flex;
    justify-content: space-between;
  }
}
</style>
