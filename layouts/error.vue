<template>
  <div
    id="page-error"
    class="main-container">
    <section>
      <header class="error-header">
        <h1 class="error-title">
          <span>{{ message }}</span>
        </h1>
      </header>
    </section>
    <div class="escape-actions">
      <nuxt-link to="/">
        ホームに戻る
      </nuxt-link>
      <nuxt-link to="/posts">
        記事一覧に戻る
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import constants from '@/assets/js/constants.js'

export default {
  name: 'TheNuxtError',
  layout: 'default',
  props: {
    error: {
      type: Object,
      default () { return {} }
    }
  },
  computed: {
    statusCode () {
      return (this.error && this.error.statusCode) || 500
    },
    message () {
      return this.error.message || 'Error'
    }
  },
  head () {
    return {
      title: `${this.message} | ${constants.title}`
    }
  }
}
</script>
<style lang="scss">
#page-error {
  height: 100%;
  .error-title {
    color: $color-accent;
    text-align: center;
    border: 1px solid rgba($color-main, .7);
    border-radius: .5rem;
    padding: 1rem;
  }
  .escape-actions {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: space-around;
    padding-top: 10vh;
    a {
      @include button();
      font-size: 2rem;
    }
  }
}
</style>
