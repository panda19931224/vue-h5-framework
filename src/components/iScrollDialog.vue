<template>
  <x-dialog v-model="currentValue" :scroll="false" :hide-on-blur="true" @on-hide="onHide">
    <div style="margin: 20px auto;">
      <slot name="scrollTitle"></slot>
      <div class="wrapper" ref="wrapper" :style="{height: scrollHeight+'px'}">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
    <span class="vux-close" @click="currentValue=false"></span>
  </x-dialog>
</template>

<script>
  import { XDialog } from 'vux'
  import BScroll from 'better-scroll'

  export default {
    components: {
      XDialog, BScroll
    },
    props: {
      bottomHeight: {
        type: Number,
        default: 150
      },
      value: {
        type: Boolean,
        default: false
      },
      onHide: {
        type: Function,
        default: () => {}
      }
    },
    computed: {
      scrollHeight: function () {
        return this.$utils.Common.getWidthHeight().height - this.bottomHeight
      }
    },
    data () {
      return {
        currentValue: false
      }
    },
    mounted () {
    },
    watch: {
      value (val) {
        this.currentValue = val
        if (val) {
          // 异步处理数据绑定
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapper, {})
          })
        }
      },
      currentValue (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .wrapper {
    overflow: hidden;
  }
</style>
