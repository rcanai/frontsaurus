<template>
  <header
    id="header"
    ref="header">
    <div class="header-container">
      <div class="site-title">
        <nuxt-link to="/">{{ headerTitle }}</nuxt-link>
      </div>
      <input
        type="checkbox"
        id="nav-toggle"
        ref="nav-toggle">
      <label
        for="nav-toggle"
        class="nav-toggle-label">
        <span />
      </label>
      <nav
        class="header-nav"
        @click="hideNav">
        <ul class="nav-links">
          <nuxt-link
            to="/"
            tag="li"
            class="nav-link">
            <a><b>H</b>ome</a>
          </nuxt-link>
          <nuxt-link
            to="/about"
            tag="li"
            class="nav-link">
            <a><b>A</b>bout</a>
          </nuxt-link>
          <nuxt-link
            to="/posts"
            tag="li"
            class="nav-link">
            <a><b>B</b>log</a>
          </nuxt-link>
          <nuxt-link
            to="/contact"
            tag="li"
            class="nav-link">
            <a><b>C</b>ontact</a>
          </nuxt-link>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import constants from '@/assets/js/constants.js'

export default {
  data () {
    return {
      nowPosition: 0,
      headerTitle: constants.title
    }
  },
  methods: {
    hideNav () {
      const $navToggle = this.$refs['nav-toggle']
      if ($navToggle.checked) {
        $navToggle.checked = false
      }
    },
    handleScroll () {
      const $header = this.$refs['header']
      const positionTop = document.documentElement.scrollTop
      if (positionTop > this.nowPosition && positionTop > 50) {
        // 下にスクロール
        $header.className = ''
      } else {
        // 上にスクロール
        $header.className = ''
      }
      this.nowPosition = positionTop
    }
  },
  mounted () {
    // スクロールイベントの設定
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>

#header {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  padding-bottom: 1rem;
  @include background-gradient(Gradient-header);

  // wave
  &::before, &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &::before {
    height: 1rem;
    background-size: 1rem 2rem;
    background-image: radial-gradient(circle at .5rem -1rem, transparent 1rem, $color-light 1.6rem);
  }
  &::after{
    height: 1.25rem;
    background-size: 2rem 2rem;
    background-image: radial-gradient(circle at .5rem 2rem, $color-light 1rem, transparent 1.6rem);
  }

  .header-container {
    width: 100%;
    max-width: $width-large;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }
  .site-title {
    position: relative;
    width: auto;
    white-space: nowrap;
    a {
      font-size: 2rem;
      color: $color-light;
      line-height: 3rem;
    }
  }
  .nav-toggle-label {
    display: inline-block;
    margin-left: 1em;
    height: 3rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    @include tap-highligh-none();
    span, span::before, span::after {
      display: block;
      background: $color-light;
      height: 2px;
      width: 2em;
      border-radius: 2px;
      position: relative;
    }
    span::before, span::after {
      content: '';
      position: absolute;
    }
    span::before {
      bottom: .5rem;
    }
    span::after {
      top: .5rem;
    }
  }
  .header-nav {
    width: 100%;
    height: 0;
    opacity: 0;
    ul {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: space-around;
      li {
        width: 40%;
        margin-bottom: 1rem;
      }
      a {
        @include button-light();
        font-size: 1.5rem;
        width: 100%;
      }
    }
  }
  #nav-toggle {
    display: none;
    &:checked ~ .header-nav {
      height: auto;
      opacity: 1;
      margin-top: 1rem;
    }
  }
}

// 背景グラデーション
@keyframes Gradient-header {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

// PC
@media screen and (min-width: $width-small) {
  #header {
    height: 8rem;
    .header-container {
      flex-flow: row nowrap;
    }
    .nav-toggle-label {
      display: none;
    }
    .header-nav {
      display: block;
      width: auto;
      height: auto;
      opacity: 1;
      ul {
        flex-flow: row nowrap;
        justify-content: flex-end;
        li {
          margin-bottom: 0;
          margin-left: 1.2rem;
          &:first-child {
            margin-left: 0;
          }
        }
        a {
          width: 6rem;
          font-size: 1.2rem;
          &:hover {
            box-shadow: 0 0 3rem rgba($color-light, .7);
          }
        }
      }
    }
  }
}
</style>
