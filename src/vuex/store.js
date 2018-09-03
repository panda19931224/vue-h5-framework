/**
 * Created by chang on 2017/8/1.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import global from './modules/global'
import config from '../../config/index'
import localStorage from '../assets/utils/localStorage'
import userInfo from './modules/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    userInfo
  },
  // 插件
  plugins: [createPersistedState({
    key: config.build.assetsPublicPath + 'vuex',
    paths: ['userInfo'],
    getState: (key) => localStorage.get(key),
    setState: (key, state) => localStorage.set(key, state)
  })]
})
