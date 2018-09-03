// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import config from '../config/index'
import routers from './router'
import 'lib-flexible'

Vue.config.productionTip = false
Vue.use(VueRouter)
const router = new VueRouter({
  // mode: 'history', // history模式
  base: config.build.assetsPublicPath,
  routes: routers.routes
})
// 消除点击之后300ms延迟
FastClick.attach(document.body)
// polyfill
import './polyfill/index'
/**
 * sync router params
 */
import { sync } from 'vuex-router-sync'
import store from './vuex/store'

const commit = store.commit
let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
/* vue-router相关配置
 * to：Route 即将要进入的目标 路由对象
 * from：Route 当前导航正要离开的路由
 * next：Function 一定要调用该方法resolve这个钩子，执行效果依赖next方法的调用参数
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  } else {
    if (!store.state.userInfo || !store.state.userInfo.token) {
      next('/')
    }
    // 过场动画
    commit('SET_CURRPATH', to.path)
    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)
    if (toIndex) {
      // 前进动画
      if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
        commit('UPDATE_DIRECTION', 'forward')
      } else {
        commit('UPDATE_DIRECTION', 'reverse')
      }
    } else {
      ++historyCount
      history.setItem('count', historyCount)
      to.path !== '/' && history.setItem(to.path, historyCount)
      commit('UPDATE_DIRECTION', 'forward')
    }
    // 页面加载前显示 loading
    commit('UPADTA_LOADING', true)
    setTimeout(next, 5)
  }
})
// 注册一个全局的after的钩子，不会改变导航
router.afterEach((to) => {
  // 页面加载后隐藏 loading
  commit('UPADTA_LOADING', false)
  // 设置标题
  if (to.meta.title || routers.defaultTitle !== routers.title) {
    Vue.$utils.Common.setTitle(to.meta.title || routers.defaultTitle)
  }
})
sync(store, router)
// 公共文件引入
import { LoadingPlugin, AlertPlugin } from 'vux'
import UtilsPlugin from './assets/utils/index'
import HttpPlugin from './http/http'
import ToastPlugin from './plugs/toast/index'

Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(UtilsPlugin)
Vue.use(HttpPlugin)
Vue.use(ToastPlugin)
/* global */
window.$globalHub = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#root')
