<template>
  <footer id="footer">
    <div class="footer-container">
      <small>&copy; 2018 rcanai</small>
      <nuxt-link to="/policy">
        プライバシーポリシー
      </nuxt-link>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
#footer {
  width: 100%;
  height: 3rem;
  background-color: $color-dark;
  color: $color-light;
  .footer-container {
    width: 96%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
