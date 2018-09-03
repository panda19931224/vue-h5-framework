export default {
  defaultTitle: 'vux模板',
  routes: [
    {
      path: '/',
      component: function (resolve) {
        require(['@/pages/Login/Index.vue'], resolve)
      },
      meta: {title: '滨湖节假日上报系统'}
    },
    {
      path: '/login',
      component: function (resolve) {
        require(['@/pages/Login/Index.vue'], resolve)
      },
      meta: {title: '旅游客情监测系统'}
    }
  ]
}
