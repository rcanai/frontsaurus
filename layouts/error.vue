<template>
  <div
    id="page-error"
    class="page-container">
    <section>
      <header class="page-header">
        <h1 class="page-title">
          <span>{{ statusCode }}</span>
          <span>.&nbsp;</span>
          <span>{{ message }}</span>
        </h1>
      </header>
      <div class="escape-links">
        <nuxt-link to="/">
          Home
        </nuxt-link>
        <div class="spacer" />
        <nuxt-link to="/posts">
          Blog
        </nuxt-link>
      </div>
    </section>
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
      title: `${this.message} - ${constants.title}`
    }
  }
}
</script>
<style lang="scss">
#page-error {
  min-height: 80vh;
  .page-title {
    margin-top: 5rem;
    color: $color-accent;
  }
  .escape-links {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    padding-top: 3rem;
    a {
      font-size: 2rem;
      border: 1px solid $color-main;
      border-radius: .5rem;
      padding: .25rem 1rem;
      transition: all .3s linear;
      &:hover {
        background-color: rgba($color-main, .7);
        border-color: rgba($color-main, .7);
        color: $color-light;
      }
    }
    .spacer {
      width: 3rem;
    }
  }
}
</style>
