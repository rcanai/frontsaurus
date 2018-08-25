<template>
  <div
    class="loading"
    :class="{
      failed: !canSuccess,
      show: show
    }"
    :style="{
      'width': percent + '%'
    }"
  />
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Loading',
  data () {
    return {
      percent: 0,
      show: false,
      canSuccess: true,
      duration: 5000,
      failedColor: '<%= loading.failedColor %>'
    }
  },
  methods: {
    start () {
      this.show = true
      this.canSuccess = true
      if (this._timer) {
        clearInterval(this._timer)
        this.percent = 0
      }
      this._cut = 10000 / Math.floor(this.duration)
      this._timer = setInterval(() => {
        this.increase(this._cut * Math.random())
        if (this.percent > 95) {
          this.finish()
        }
      }, 100)
      return this
    },
    set (num) {
      this.show = true
      this.canSuccess = true
      this.percent = Math.floor(num)
      return this
    },
    get () {
      return Math.floor(this.percent)
    },
    increase (num) {
      this.percent = this.percent + Math.floor(num)
      return this
    },
    decrease (num) {
      this.percent = this.percent - Math.floor(num)
      return this
    },
    finish () {
      this.percent = 100
      this.hide()
      return this
    },
    pause () {
      clearInterval(this._timer)
      return this
    },
    hide () {
      clearInterval(this._timer)
      this._timer = null
      setTimeout(() => {
        this.show = false
        Vue.nextTick(() => {
          setTimeout(() => {
            this.percent = 0
          }, 200)
        })
      }, 500)
      return this
    },
    fail () {
      this.canSuccess = false
      return this
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0px;
  height: .25rem;
  width: 0%;
  transition: width 0.3s, opacity 0.4s;
  opacity: 1;
  background-color: rgba($color-main, .8);
  z-index: 999999;
  opacity: 0;
  &.show {
    opacity: 1;
  }
  &.failed {
    background-color: rgba($color-accent, .8);
  }
}
</style>
