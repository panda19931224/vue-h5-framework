/**
 * Created by chang on 2017/4/15.
 * 接口请求异常处理
 */
import Vue from 'vue'
export default {
  ErrorMsgNotification (code, msg) {
    switch (code) {
      case 401:
        window.$globalHub.$router.push({ path: '/Index' })
        window.$globalHub.$store.dispatch('LogOut').then(() => {})
        // 权限过期
        Vue.$vux.alert.show({ content: (msg && msg.Message) || '您的权限已过期，请重新登录！' })
        break
      case 400:
        // 请求参数错误
        Vue.$vux.alert.show({ content: (msg && msg.Message) || '提交的数据有错误！' })
        break
      case 500:
        // 系统错误
        Vue.$vux.alert.show({ content: (msg && msg.Message) || '系统报错啦，请联系管理员！' })
        break
      default:
        // 其它
        Vue.$vux.alert.show({ content: (msg && msg.Message) || '传输异常，请稍后再试！' })
    }
  }
}
