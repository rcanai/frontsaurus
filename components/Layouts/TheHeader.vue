<template>
  <header
    id="header"
    ref="header">
    <div class="header-container">
      <nuxt-link
        to="/"
        class="site-title">
        <span>{{ headerTitle }}</span>
        <small>- WEB開発に役立つ情報を発信 -</small>
        <ul>
          <li
            v-for="i in 4"
            :key="i">
            <img
              src="/images/footstep.svg"
              alt="footstep">
          </li>
        </ul>
      </nuxt-link>
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
            <a>Home</a>
          </nuxt-link>
          <nuxt-link
            to="/posts"
            tag="li"
            class="nav-link">
            <a>Blog</a>
          </nuxt-link>
          <nuxt-link
            to="/about"
            tag="li"
            class="nav-link">
            <a>About</a>
          </nuxt-link>
          <nuxt-link
            to="/contact"
            tag="li"
            class="nav-link">
            <a>Contact</a>
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
  background-color: $color-main;

  // wave
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1rem;
    background-size: 1rem 2rem;
    background-image: radial-gradient(circle at .5rem -1rem, transparent 1rem, $color-light 1.6rem);
  }

  .header-container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: .5rem;
  }
  .site-title {
    position: relative;
    max-width: calc(100% - 4rem); // - (nav-toggle-label: width + 1rem)
    white-space: nowrap;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    justify-content: flex-end;
    color: $color-light;
    span {
      width: 100%;
      font-size: 1.8rem;
      font-weight: bold;
      z-index: 1;
    }
    small {
      width: 100%;
      margin-bottom: auto;
      padding-left: 2rem;
      z-index: 1;
    }
    ul {
      position: absolute;
      right: -1rem;
      bottom: -.5rem;
      display: flex;
      flex-flow: row nowrap;
      li {
        width: 3rem;
        height: auto;
        margin-left: 1rem;
        &:nth-child(even) {
          margin-top: -2rem;
        }
      }
    }
  }
  .nav-toggle-label {
    display: inline-block;
    width: 3rem;
    height: 4rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    @include tap-highligh-none();
    span, span::before, span::after {
      display: block;
      background: $color-light;
      height: .25rem;
      width: 2rem;
      position: relative;
    }
    span::before, span::after {
      content: '';
      position: absolute;
    }
    span::before {
      bottom: .75rem;
    }
    span::after {
      top: .75rem;
    }
  }
  .header-nav {
    width: 100%;
    height: 0;
    opacity: 0;
    ul {
      list-style: none;
      display: flex;
      flex-flow: row wrap;
      align-items: flex-end;
      justify-content: space-around;
      li {
        width: 40%;
        margin-bottom: 1rem;
      }
      a {
        @include button-light();
        width: 100%;
        padding: 1rem 0;
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
          margin-left: 1rem;
          &:first-child {
            margin-left: 0;
          }
        }
        a {
          width: 6rem;
          padding: 0;
          &:hover {
            box-shadow: 0 0 3rem rgba($color-light, .7);
          }
        }
      }
    }
  }
}
@media screen and (min-width: $width-small) {
  #header {
    .site-title {
      height: 100%;
      span {
        font-size: 2rem;
        letter-spacing: .25rem;
      }
      ul {
        right: 10%;
        bottom: 10%;
      }
    }
    .header-nav {
      ul {
        a {
          padding: .25rem 0;
        }
      }
    }
  }
}
</style>
