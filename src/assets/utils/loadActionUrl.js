import config from '../../../config/index'

export default {
  getUpLoadActionUrl() {
    var url
    // 生产/测试环境
    if (process.env.NODE_ENV !== 'development') {
      // 测试环境
      if (process.env.NODE_ENV === 'testing') {
        // 测试环境，访问测试接口
        url = config.build.offlineApiUrl
      } else {
        url = config.build.onlineApiUrl
      }
    } else {
      url = config.build.offlineApiUrl
    }
    return url
  }
}
