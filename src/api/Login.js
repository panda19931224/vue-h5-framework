/**
 * Created by chang on 2017/8/2.
 */
import Vue from 'vue'
import errorEx from './exceptions'

export default {
  /**
   * 发送验证码
   * @param param
   */
  testSendCode (param) {
    return new Promise((resolve) => {
      Vue.$api.xHttp.post('shopApi/validationCodeService.app', {phone: param.phone}).then(res => {
        resolve(res)
      }).catch((ex) => {
        errorEx.ErrorMsgNotification(-1)
      })
    })
  }
}
