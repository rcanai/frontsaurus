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
      <nuxt-link to="/posts">
        記事一覧に戻る
      </nuxt-link>
      <nuxt-link to="/contact">
        お問い合わせ
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
  .error-title {
    color: $color-danger;
    text-align: center;
    padding: 1rem;
  }
  .escape-actions {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-around;
    padding: 10% 0;
    a {
      @include button();
      font-size: 1.5rem;
      margin-bottom: 10%;
    }
  }
}
</style>
