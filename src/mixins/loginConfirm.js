
export default {
  // 此处编写的就是Vue组件实例的配置项，通过一定语法，可以直接混入到组件内部

  methods: {
    loginConfirm () {
      // 判断token是否存在
      // 不存在
      if (!this.$store.getters.token) {
        this.goLogin()
        return false
      }
      return true
    },
    // 弹窗diglog弹窗，选择取消或登录
    goLogin () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '此时需要先登录才能继续操作哦',
        confirmButtonText: '去登录',
        cancelButtonText: '再逛逛'
      })
        .then(() => {
          // 携带当前详情地址，登录成功后返回当前地址
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    }
  }

}
