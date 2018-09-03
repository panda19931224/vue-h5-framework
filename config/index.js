// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: process.env.NODE_ENV === 'testing' ? require('./test.env') : require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/iRegistrationH5/',
    productionSourceMap: false,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    onlineApiUrl: 'http://221.226.175.82:9918/binhuReport', // 线上环境接口地址
    offlineApiUrl:'http://221.226.175.82:9918/binhuReport' // 测试环境接口地址
  },
  dev: {
    env: require('./dev.env'),
    port: 8083,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    openUrlQuery: '', // 调试时，启动页面参数，例如 '/index?cryptPhone=ILUV/Y34vi7INGusxX/jMA=='
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    useEslint: true,
    showEslintErrorsInOverlay: false,
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: false,
    useLocalSidebar: true // 是否使用本地菜单，如果设为false，则使用poc配置的菜单
  }
}
