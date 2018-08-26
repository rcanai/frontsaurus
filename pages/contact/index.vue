<template>
  <div
    id="page-contact"
    class="main-container">
    <section>
      <header class="page-header">
        <h1 class="page-title">お問い合わせ</h1>
      </header>
      <p class="letter">
        申し訳ございません。<br>
        現在、お問い合わせをGoogleフォームのみからと<br>
        させていただいております。<br>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdJpo9QjM3h0D9UXFi1SzVDwQafmkrkFAf-zPEUpel2drHEiA/viewform?usp=sf_link"
          target="_blank">
          こちらのリンク
        </a>
        から送信をお願いいたします。
      </p>
      <div
        ref="contact-form"
        class="form"
        role="form">
        <div class="form-item">
          <label for="contact-form-name">
            <strong>お名前</strong>
            <small class="required">(必須)</small>
          </label>
          <input
            type="text"
            id="contact-form-name"
            disabled
            required>
        </div>
        <div class="form-item">
          <label for="contact-form-email">
            <strong>メールアドレス</strong>
            <small class="required">(必須)</small>
          </label>
          <input
            type="email"
            id="contact-form-email"
            disabled
            required>
        </div>
        <div class="form-item">
          <label for="contact-form-content">
            <strong>内容</strong>
            <small class="required">(必須)</small>
          </label>
          <textarea
            id="contact-form-content"
            rows="7"
            disabled
            required />
        </div>
        <div
          class="form-item"
          style="text-align:center;">
          <button
            type="button"
            disabled
            @click.stop="send">送信する</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import constants from '@/assets/js/constants.js'

export default {
  layout: 'default',
  methods: {
    send () {}
  },
  head () {
    return {
      title: `お問い合わせ | ${constants.title}`
    }
  }
}
</script>

<style lang="scss">
#page-contact {
  .letter {
    text-align: center;
    background-color: rgba($color-main, .1);
    padding: 3rem;
    a {
      text-decoration: underline;
      font-weight: bold;
      color: $color-main;
    }
  }
  .form {
    padding: 1rem;
    width: 80%;
    max-width: 30rem;
    margin: 0 auto;
    .form-item {
      margin-bottom: 2rem;
    }
    label {
      display: block;
      width: 100%;
      margin-bottom: .25rem;
      .required {
        color: $color-accent;
        font-weight: bold;
      }
    }
    input,
    textarea {
      @include input();
      width: 100%;
    }
    button {
      @include button();
    }
  }
}
</style>
