import axios from 'axios'
import qs from 'qs'
import config from '../../config'
import store from '../vuex/store'
import router from '../router'

axios.defaults.paramsSerializer = function (data) {
  return qs.stringify(data)
}
axios.defaults.transformRequest = [
  function (data) {
    return qs.stringify(data)
  }
]
export default {
  install (Vue) {
    const specialHandle = function (res) {
      const result = res.data
      if (result.status === 400) {
        throw Error(result.msg || '提交信息有误，请核验后提交')
      }
      if (result.status === 401) {
        store.dispatch('LogOut')
        router.push('/login')
        throw Error(result.msg || '登录过期')
      }
      return result
    }
    Vue.prototype.$http = function (method, url, params, data, headers) {
      return axios({
        method,
        url: url.replace(
          /^api/,
          process.env.NODE_ENV === 'production' ? config.build.onlineApiUrl : config.build.offlineApiUrl
        ),
        params,
        data,
        headers: {
          token: store.state.userInfo && store.state.userInfo.token,
          ...headers
        },
        responseType: 'json'
      })
        .then(res => specialHandle(res))
        .catch(err => {
          Vue.$vux.alert.show({ content: (err && err.message) || '服务器繁忙...' })
        })
    }
    Vue.prototype.$get = function (url, params, headers) {
      return axios({
        method: 'get',
        url: url.replace(
          /^api/,
          process.env.NODE_ENV === 'production' ? config.build.onlineApiUrl : config.build.offlineApiUrl
        ),
        params,
        headers: {
          token: store.state.userInfo && store.state.userInfo.token,
          ...headers
        },
        responseType: 'json'
      })
        .then(res => specialHandle(res))
        .catch(err => {
          Vue.$vux.alert.show({ content: (err && err.message) || '服务器繁忙...' })
        })
    }
    Vue.prototype.$post = function (url, data, headers) {
      return axios({
        method: 'post',
        url: url.replace(
          /^api/,
          process.env.NODE_ENV === 'production' ? config.build.onlineApiUrl : config.build.offlineApiUrl
        ),
        params: null,
        data,
        headers: {
          token: store.state.userInfo && store.state.userInfo.token,
          ...headers
        },
        responseType: 'json'
      })
        .then(res => specialHandle(res))
        .catch(err => {
          Vue.$vux.alert.show({ content: (err && err.message) || '服务器繁忙...' })
        })
    }
    Vue.prototype.$delete = function (url, data, headers) {
      return axios({
        method: 'delete',
        url: url.replace(
          /^api/,
          process.env.NODE_ENV === 'production' ? config.build.onlineApiUrl : config.build.offlineApiUrl
        ),
        data,
        headers: {
          token: store.state.userInfo && store.state.userInfo.token,
          ...headers
        },
        responseType: 'json'
      })
        .then(res => specialHandle(res))
        .catch(err => {
          Vue.$vux.alert.show({ content: (err && err.message) || '服务器繁忙...' })
        })
    }
  }
}
