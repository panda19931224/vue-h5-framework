import Vue from 'vue'

const { RSA } = require('../assets/utils/rsa').crypto
import ErrorException from './exceptions'

export default {
  /**
   * 用户登录
   * @param param
   * @returns {AxiosPromise<any> | * | void}
   */
  loginByUsername (param) {
    param.password = RSA.encrypt(param.password)
    return Vue.prototype.$post('api/authority/login', param)
  },
  /**
   * 获取用户列表
   * @param param 入参
   * @returns {Promise}
   */
  queryUserList (param) {
    return new Promise((resolve) => {
      Vue.prototype.$get('api/authority/user', param).then((res) => {
        if (res && res.status === 200) {
          resolve(res)
        } else {
          ErrorException.ErrorMsgNotification(res.status)
        }
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 用户注册
   * @param param 入参
   * @returns {Promise}
   */
  registerInfo (param) {
    return new Promise((resolve) => {
      Vue.prototype.$post('api/authority/register', param, '').then((res) => {
        if (res && res.status === 200) {
          resolve(res)
        } else {
          ErrorException.ErrorMsgNotification(res.status)
        }
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 新增/编辑-保存用户信息
   * @param param 入参
   * @returns {Promise}
   */
  persistUserInfo (param) {
    return new Promise((resolve) => {
      Vue.prototype.$post('api/authority/user', param).then((res) => {
        if (res && res.status === 200) {
          resolve(res)
        } else {
          ErrorException.ErrorMsgNotification(res.status)
        }
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 删除
   * @param param 入参
   * @returns {Promise}
   */
  deleteUserList (param) {
    var url = 'api/authority/user/' + param.id
    return new Promise((resolve) => {
      Vue.prototype.$delete(url).then((res) => {
        if (res && res.status === 200) {
          resolve(res)
        } else {
          ErrorException.ErrorMsgNotification(res.status)
        }
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 搜索列表
   * @param param 入参
   * @returns {Promise}
   */
  queryUserListByParams (param) {
    var url = 'api/queryUserByCondition/' + param
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url, '').then((res) => {
        if (res && res.status === 200) {
          resolve(res)
        } else {
          ErrorException.ErrorMsgNotification(res.status)
        }
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  },
  /**
   * 分页查询
   * @param {Object} pagination
   * @returns {Promise}
   */
  handleTableChange (pagination) {
    return Vue.$api.xHttp.post('api/userList', pagination)
  },
  /**
   * 修改密码
   * @param param 入参
   * @returns {Promise}
   */
  modifyPwd (param) {
    var url = 'api/changePwd/'
    return new Promise((resolve) => {
      Vue.$api.xHttp.post(url, param, '').then((res) => {
        if (res && res.status === 200) {
          resolve(res)
        } else {
          ErrorException.ErrorMsgNotification(res.status)
        }
      }).catch((ex) => {
        ErrorException.ErrorMsgNotification(ex.code)
      })
    })
  }
}
