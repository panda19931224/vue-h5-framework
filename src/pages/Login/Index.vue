<template>
  <div class="guide-page">
    <div class="sys-logo">
      <p>滨湖节假日上报系统</p>
    </div>
    <div class="login-wrapper">
      <group>
        <x-input type="text" placeholder="请输入账号" v-model="loginForm.account"></x-input>
        <x-input type="password" placeholder="请输入登录密码" v-model="loginForm.password"></x-input>
        <x-input placeholder="验证码" v-model="loginForm.verifyCode">
          <img slot="right-full-height" :src="codeImg" @click="createCode">
        </x-input>
      </group>
    </div>
    <div class="btn-login-wrapper">
      <x-button @click.native="loginByAccount">登录</x-button>
    </div>
  </div>
</template>
<script>
import BLL from './Index.js'
import UUID from '../../assets/utils/uuid'
import ActionUrl from '../../assets/utils/loadActionUrl'
import { XInput, Group, XButton, Box } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Box
  },
  data () {
    return {
      loginForm: {
        account: 'xwsoft',
        password: 'Hwfx1234,',
        verifyCode: ''
      },
      codeImg: '',
      loading: false
    }
  },
  created () {
    this.BLL = new BLL(this)
    this.createCode()
  },
  mounted () {
  },
  computed: {},
  methods: {
    // 获取验证码
    createCode () {
      // 生成8位16进制的唯一ID
      this.loginForm.uuid = 'JSSESSION' + UUID.getUID(10, 16)
      this.codeImg = ActionUrl.getUpLoadActionUrl() + '/captcha?uuid=' + this.loginForm.uuid
      console.log(this.codeImg)
    },
    // 用户登录
    loginByAccount () {
      this.BLL.login()
    },
    handleClick () {
      this.$router.push({ path: '/index' })
    },
    getStyle (index) {
      return `background-image:url(${this.items[index].url})`
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
.guide-page {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #33b5e5;
  overflow: hidden;
  .sys-logo {
    margin: 22vh auto 0;
    width: 100%;
    text-align: center;
    p {
      font-size: 0.72rem;
      color: #fff;
      font-weight: bolder;
    }
  }
  .login-wrapper {
    margin: 20px auto;
    width: 90%;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
  }
  .btn-login-wrapper {
    margin: 30px auto;
    width: 91%;
  }
}
</style>
