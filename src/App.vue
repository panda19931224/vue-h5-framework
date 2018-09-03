<template>
  <div id="app" style="height: 100%;width: 100%;
  overflow: hidden;" v-cloak>
    <template v-if="showHeader">
      <x-header>{{title}}</x-header>
    </template>
    <view-box ref="AppViewBox" style="height: calc( 100% - 46px )">
      <!--region 遮罩层-->
      <div class="weui-mask transparent" v-show="showMask"></div>
      <!--endregion-->
      <!--region 主体内容-->
      <div class="page-wrap">
        <!--endregion-->
        <transition :name="transitionName" @after-enter="afterEnter">
          <router-view keep-alive class="router-view"></router-view>
        </transition>
      </div>
      <!--endregion-->
    </view-box>
  </div>
</template>

<script>
import { XHeader, ViewBox, Loading } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    XHeader, ViewBox, Loading
  },
  data () {
    return {
      transition: 'go'
      // showHeader: false // 是否显示头
    }
  },
  created () {
    // 移动端调试 console
    // more info https://github.com/liriliri/eruda
    // if (this.$utils.Common.getParam('debug')) {
    //   const script = document.createElement('script')
    //   script.src = 'https://cdn.bootcss.com/eruda/1.2.3/eruda.js'
    //   document.body.appendChild(script)
    //   script.onload = function () { window.eruda.init({ tool: ['console', 'network', 'sources'] }) }
    // }
    // if (this.$route.path === '/login' || this.$route.path === '/') {
    //   this.showHeader = false
    // } else {
    //   this.showHeader = true
    // }
  },
  computed: {
    ...mapState({
      direction: ({ global }) => global.direction,
      isLoading: ({ global }) => global.isLoading,
      showMask: ({ global }) => global.showMask
    }),
    transitionName () {
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    },
    // 获取标题
    title () {
      return this.$store.state.route.meta.title
    },
    showHeader () {
      let title = this.$store.state.route.meta.title
      if (title && title !== '滨湖节假日上报系统') {
        return true
      }
      return false
    }
  },
  methods: {
    afterEnter () {
      // 过场动画完成后
      // 去除全屏遮罩
      this.$store.commit('SHOW_MASK', false)
    }
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import "assets/styles/global/iconfont";
@import "assets/styles/global/common";
@import "assets/styles/global/custom";
@import "assets/styles/global/close";
</style>
