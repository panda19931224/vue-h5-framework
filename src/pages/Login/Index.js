import Base from '../Base/Index'
import Vue from 'vue'

export default class extends Base {
  /**
   *用户登录
   */
  login () {
    // 用户登录
    this.vm.$store
      .dispatch('LoginByUsername', this.vm.loginForm)
      .then(() => {
        this.vm.$router.push({ path: '/' })
      })
      .catch(e => {
        this.vm.loading = false
        this.vm.loginForm.password = null
        this.vm.loginForm.verifyCode = null
        this.vm.createCode()
        Vue.$vux.alert.show({ content: e.msg || '系统错误' })
      })
  }
}
