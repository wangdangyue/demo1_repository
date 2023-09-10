<template>
  <div class="address">
    <van-nav-bar title="地址" left-arrow @click-left="$router.go(-1)" />
    <div v-if="list.length <= 0" class="null">
      <img src="@/assets/empty.png" alt="" /><br />
      没有添加地址
      <van-button @click="addDefaultAddress" color="linear-gradient(to right, #ff6034, #ee0a24)">
        添加默认地址
      </van-button>
    </div>
    <van-address-list
      v-else
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getAddersList, defaultAddress } from '@/api/adders'
export default {
  name: 'AddressPage',
  data () {
    return {
      chosenAddressId: '1',
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    onAdd () {
      this.$router.push('/addressedit')
    },
    onEdit (item, index) {
      Toast('编辑地址:' + index)
    },
    async getList () {
      const {
        data: { list }
      } = await getAddersList()
      list.forEach((item) => {
        this.list.push({
          id: item.address_id,
          name: item.name,
          tel: item.phone,
          address: item.region.city.concat(
            item.region.province,
            item.region.region
          ),
          isDefault: false
        })
      })
      // this.list[0].isDefault = true
      // console.log(this.list)
    },
    async addDefaultAddress () {
      const res = await defaultAddress()
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.address {
  height: 100vh;
  background-color: #f7f7f7;
}
.null {
  width: 200px;
  margin: 150px auto 0px;
  padding-bottom: 300px;
  color: gray;
  // background-color: #fff;
  img {
    width: 100%;
    height: 100%;
  }
}
.van-button {
  border-radius: 20px;
}
</style>
