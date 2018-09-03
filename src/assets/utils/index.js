/**
 * Created by chang on 2017/8/1.
 */
import Common from './common.js'
import LocalStorage from './localStorage.js'
export const utils = {Common, LocalStorage}

export default {
  install (Vue) {
    Vue.prototype.$utils = utils
    Vue.$utils = utils
  },
  $utils: utils
}
