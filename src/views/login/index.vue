<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="$router.go(-1)" />
    <div class="login">
      <h1>手机号登录</h1>
      <span style="color: gray">未注册的手机号登录后将会自动注册</span>
      <ul>
        <li><input v-model="mobile" type="text" placeholder="请输入手机号码" /></li>
        <li>
          <input v-model="picCode" type="text" placeholder="请输入图形验证码" />
          <img v-if="picUrl" @click="getPicCode" :src="picUrl" alt="" />
        </li>
        <li>
          <input v-model="msgCode" type="text" placeholder="请输入短信验证码" />
          <span  :class="{getCodeText:second===totalSecond,gray:second!=totalSecond}" @click="getCode">{{ totalSecond === second?'获取验证码' : `重新发送(${second})秒` }}</span>
        </li>
        <li>
          <van-button @click="login" color="linear-gradient(to right,#0cd913 , #058e0a)"
            >登录
          </van-button >
        </li>
      </ul>
    <div style="color: #a8a9ab;font-size: 12px; text-align: right;">测试环境下， 默认的短信验证码为： 246810</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picKey: '', // 传递图形验证码的唯一标识
      picUrl: '', // 储存请求渲染的图片地址
      totalSecond: 60,
      second: 60, // 当前秒数
      picCode: '', // 用户输入的图形验证
      mobile: '', // 手机号
      msgCode: '' // 短信验证码

    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    // 获取图片验证码
    async getPicCode () {
      const { data: { key, base64 } } = await getPicCode()
      // console.log(key, base64)
      this.picUrl = base64
      this.picKey = key
    },
    // 校验手机号和图形验证码
    vailFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        if (!this.mobile.trim()) {
          this.$toast('请输入手机号')
          return false
        }
        this.$toast('手机号格式错误')
        return false
      } else if (!/^\w{4}$/.test(this.picCode)) {
        if (!this.picCode.trim()) {
          this.$toast('请输入图形验证码')
          return false
        }
        this.$toast('图形验证码格式错误')
        return false
      } else return true
    },
    // 获取短信验证码
    async  getCode () {
      // 判断是否已经发送验证码
      if (!this.second === this.totalSecond) return
      // 判断手机号和图形验证码
      if (!this.vailFn()) return
      // 发送请求获取短信验证码
      const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
      // console.log(res)
      // 判断短信验证码是否发送
      if (res.status === 200) {
        this.$toast('发送成功')
        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    async login () {
      if (!this.vailFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        if (!this.msgCode.trim()) {
          this.$toast('请输入短信验证码')
        } else {
          this.$toast('短信验证码格式错误')
        }
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      // console.log(res.data)
      const userInfo = res.data
      if (res.status === 200) {
        this.$toast(res.message)
        this.$store.commit('user/setUserInfo', { token: userInfo.token, userId: userInfo.userId })

        const url = this.$route.query.backUrl || '/'
        this.$router.replace(url)
      }
    },
    destroyed () {
      clearInterval(this.timer)
    }

  }

}

</script>

<style lang="less" scoped>
div {
  font-family: "KaiTi";
}
.login {
  padding: 20px;
}
img {
  width: 80px;
}
ul {
  margin-top: 40px !important;
  /* background-color: pink; */
}
li {
  /* margin: 25px 0; */
  height: 60px;
  /* background-color: green; */
  border-bottom: 1px solid #edeef1;
  // border-bottom: 1px solid #0cd913;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
li:last-child {
  border: 0;
  button {
    width: 100%;
    height: 40px;
    font-size: 20px;
    border-radius: 50px;
  }
}
input {
  height: 70%;
  border: 0;
  outline: none;
}.getCodeText{
  color: green;font-size: 14px;font-weight: bold;
}.gray{
  color: #a8a9ab;font-size: 14px;
  }
</style>
