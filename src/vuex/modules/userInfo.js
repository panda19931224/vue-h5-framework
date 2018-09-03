// import {deepCopy} from '../../assets/utils/util'
// initial state
import UserApi from '../../api/User'

const state = {
  curUserInfo: {},
  token: ''
}
// const defaultValue = deepCopy(state)
// getters
const getters = {
  userInfo: state => state.curUserInfo
}
// mutations
const mutations = {
  SET_USER_INFO: (state, userInfo) => {
    state.curUserInfo = userInfo
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}
const actions = {
  // 用户名登录
  LoginByUsername ({ commit }, userInfo) {
    userInfo.account = userInfo.account.trim()
    return new Promise((resolve, reject) => {
      UserApi.loginByUsername(userInfo)
        .then(response => {
          if (response.status === 200) {
            let data = response.data
            commit('SET_TOKEN', data.token)
            commit('SET_USER_INFO', {
              roleId: response.data.roleIds,
              userId: response.data.id,
              ...response.data
            })
            resolve()
          } else {
            reject(response)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 退出
  LogOut ({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', null)
      commit('SET_USER_INFO', null)
      resolve()
    })
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
