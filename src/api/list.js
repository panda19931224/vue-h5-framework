import Vue from 'vue'

export default {
  // 查询
  getList (params) {
    return new Promise(resolve => {
      Vue.prototype.$get('api/gather/hotelDetail', params).then(res => {
        resolve(res)
      })
    })
  },
  // 新增
  addStayInfor (params) {
    return new Promise(resolve => {
      Vue.prototype.$post('api/gather/hotelDetail', params).then(res => {
        resolve(res)
      })
    })
  }
  // 删除
  // handleDel(params) {
  //   return new Promise(resolve => {
  //     Vue.prototype.$delete('api/gather/hotelDetail/' + params).then(res => {
  //       resolve(res)
  //     })
  //   })
  // }
}
