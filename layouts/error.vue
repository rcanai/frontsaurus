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
}
</style>
