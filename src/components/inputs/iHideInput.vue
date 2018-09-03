<template>
  <div class="hide-input-component">
    <group title="">
      <x-input :title="title" v-model="currentValue" v-show="(autoHide&&currentValue.length!==length)||showInput"
               :placeholder="placeholder" :keyboard="keyboard" ref="idCardInput" @on-blur="onBlur"></x-input>
      <cell :title="hideValue" @click.native="idCardClick"
            v-show="(!autoHide||currentValue.length==length)&&!showInput" :class="txtClass">
        <div slot="icon" :class="titleClass">
          {{title}}
        </div>
      </cell>
    </group>
  </div>
</template>
<script>
  import { XInput, Cell, Group } from 'vux'

  export default {
    components: {XInput, Cell, Group},
    props: {
      type: String,
      value: String,
      title: String,
      placeholder: String
    },
    data () {
      return {
        currentValue: '',
        length: 0,
        regular: null,
        autoHide: true,
        keyboard: null,
        showInput: true
      }
    },
    created () {
      switch (this.type) {
        case 'idCard' : {
          this.length = 18
          this.regular = [/(\d{2})\d{14}(\d{2})/, '$1∗∗∗∗∗∗∗∗∗∗∗∗∗∗$2']
          break
        }
        case 'name' : {
          this.length = 6
          this.regular = [/.(?=.)/g, '∗']
          this.autoHide = false
          break
        }
        case 'phone' : {
          this.length = 11
          this.regular = [/(\d{3})\d{4}(\d{4})/, '$1∗∗∗∗$2']
          this.keyboard = 'number'
          break
        }
      }
    },
    mounted () {
    },
    computed: {
      hideValue () {
        if (this.currentValue && (!this.autoHide || this.currentValue.length === this.length)) {
          return this.currentValue.replace(this.regular[0], this.regular[1])
        }
        return ''
      },
      titleClass () {
        return 'weui-label'
      },
      txtClass () {
        return 'left'
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (val) {
        if (this.autoHide && val && val.length === this.length) {
          this.showInput = false
        }
        this.$emit('input', val)
      }
    },
    methods: {
      onBlur () {
        if (this.currentValue) {
          this.showInput = false
        }
      },
      idCardClick () {
        this.showInput = true
        this.$nextTick(() => {
          this.$refs.idCardInput.focus()
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .hide-input-component {
    .weui-cells:before{
      border-width: 0;
    }
    .weui-cell__ft {
      color: #333;
    }
    .weui-label {
      width: 4.2em !important;
      margin-right: 1em;
    }
    .title_right {
      .weui-label {
        text-align: right;
      }
    }
    .title_left {
      .weui-label {
        text-align: left;
      }
    }
    .txt_left {
      .vux-cell-bd {
        p {
          text-align: left;
        }
      }
    }
    .txt_right {
      .vux-cell-bd {
        p {
          text-align: right;
        }
      }
    }
  }
</style>
