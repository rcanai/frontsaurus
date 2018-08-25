<template>
  <div
    id="page-about"
    class="main-container">
    <section>
      <header class="page-header">
        <h1 class="page-title">アバウト</h1>
      </header>
      <section>
        <header>
          <h2>このサイトについて</h2>
        </header>
        <p>
          このサイトは、フロントエンドの技術を中心に発信するブログサイトです。
        </p>
      </section>
      <section>
        <header>
          <h2>プロフィール</h2>
        </header>
        <div class="profile">
          <div class="avatar-wrapper">
            <img
              src="/avatar.png"
              alt="avatar">
          </div>
          <div>
            <p class="my-name">rcanai</p>
            <p class="my-description">Web Engineer</p>
          </div>
        </div>
      </section>
      <section class="section-skill">
        <header>
          <h2>スキル</h2>
        </header>
        <section>
          <h3 class="skill-title">フロントエンド</h3>
          <ul class="skills">
            <li>HTML5</li>
            <li>CSS3 & SCSS</li>
            <li>JavaScript</li>
            <li>jQuery</li>
            <li>VueJS</li>
            <li>NuxtJS</li>
            <li>Webpack</li>
            <li>Babel</li>
          </ul>
        </section>
        <section>
          <h3 class="skill-title">サーバーサイド</h3>
          <ul class="skills">
            <li>Linux / CentOS</li>
            <li>NodeJS</li>
            <li>PHP</li>
            <li>Laravel</li>
            <li>Ruby</li>
            <li>Ruby on Rails</li>
            <li>MySQL</li>
            <li>PostgreSQL</li>
          </ul>
        </section>
        <section>
          <h3 class="skill-title">その他</h3>
          <ul class="skills">
            <li>SVN</li>
            <li>Git</li>
            <li>Vagrant</li>
          </ul>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import constants from '@/assets/js/constants.js'

export default {
  layout: 'default',
  head () {
    return {
      title: `アバウト | ${constants.title}`
    }
  }
}
</script>

<style lang="scss">
#page-about {
  .site-dscription {
    text-align: center;
    font-size: 1.25rem;
    word-break: break-all;
  }
  .profile {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    max-width: 30rem;
    margin: 0 auto;
    padding-top: 4rem;
  }
  .avatar-wrapper {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    border: 1px solid $color-main;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    img {
      width: 95%;
      height: 95%;
    }
  }
  .my-name {
    font-size: 3rem;
    font-weight: bold;
  }
  .my-description {
    font-size: 1.5rem;
    position: relative;
    &::before {
      content: "-";
      position: absolute;
      left: 105%;
    }
    &::after {
      content: "-";
      position: absolute;
      right: 105%;
    }
  }
  .section-skill {
    max-width: 600px;
    margin: 2rem auto 2rem auto;
    padding: 1rem;
    border: 1px solid rgba($color-gray, .5);
    border-radius: .5rem;
    h2 {
      color: $color-main;
      white-space: nowrap;
    }
  }
  .skill-title {
    margin-top: 2rem;
  }
  .skills {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    li {
      margin: .5rem;
      border: 1px solid rgba($color-main, .5);
      border-radius: .5rem;
      padding: .5rem;
    }
  }
}
</style>
