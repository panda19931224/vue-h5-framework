/**
 * Created by chang on 2017/8/1.
 */

const state = {
  direction: 'forward', // 页面切换动画
  isLoading: false, // 页面切换显示loading
  showMask: false,
  currPath: '' // 当前路由地址
}
const mutations = {
  UPDATE_DIRECTION (state, direction) {
    state.direction = direction
  },
  SHOW_MASK (state, showMask) {
    state.showMask = showMask
  },
  SET_CURRPATH (state, value) {
    state.currPath = value
  },
  UPADTA_LOADING (state, value) {
    state.isLoading = value
  }
}
export default {
  state,
  mutations
}
