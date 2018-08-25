<template>
  <div id="layout-default">
    <TheHeader />
    <main id="main">
      <nuxt />
    </main>
    <TheAside />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/Layouts/TheHeader'
import TheAside from '@/components/Layouts/TheAside'
import TheFooter from '@/components/Layouts/TheFooter'

export default {
  components: {
    TheHeader,
    TheAside,
    TheFooter
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/layouts/default.scss";
</style>
