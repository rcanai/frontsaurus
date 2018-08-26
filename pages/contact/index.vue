<template>
  <div
    id="page-contact"
    class="main-container">
    <section>
      <header class="page-header">
        <h1 class="page-title">お問い合わせ</h1>
      </header>
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
            required />
        </div>
        <div
          class="form-item"
          style="text-align:center;">
          <button
            type="button"
            @click.stop="send">現在送信できません</button>
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
