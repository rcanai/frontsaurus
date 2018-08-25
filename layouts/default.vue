<template>
  <div>
    <TheHeader />
    <main id="main">
      <nuxt/>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/Layouts/TheHeader'
import TheFooter from '@/components/Layouts/TheFooter'

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/layouts/reset.scss";
@import "@/assets/scss/layouts/default.scss";
</style>
