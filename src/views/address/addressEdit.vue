<template>
  <div class="addressedit">
    <van-nav-bar title="编辑地址" left-arrow @click-left="$router.go(-1)" />
    <van-address-edit
  :area-list="areaList"
  show-delete
  show-set-default
  show-search-result
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
  @change-detail="onChangeDetail"
/>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getAreaList } from '@/api/adders'
import { areaList } from '@vant/area-data'
export default {
  data () {
    return {
      province_list: {},
      city_list: {},
      county_list: {},
      areaList,
      searchResult: []
    }
  },
  created () {
    this.getAreaList()
  },
  methods: {
    onSave (e) {
      console.log(e)
      Toast('save')
    },
    onDelete () {
      Toast('delete')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }
        ]
      } else {
        this.searchResult = []
      }
    },
    async getAreaList () {
      const res = await getAreaList()
      console.log(res)
      // res.data.list.forEach(item => {
      // this.province_list=Object.assign(this.province_list,{item.value.id:item.name})
      // this.city_list=Object.assign(this.city_list,{item.city.id:item.name})
      // this.county_list.push()
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.addressedit{
  background-color: #F7F7F7;
  height: 100vh;
}
</style>
