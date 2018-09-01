<template>
  <div class="share-buttons">
    <slot />
    <a
      :href="`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${formattedTags}`"
      target="_blank"
      class="share-button share-button-twitter"
      rel="nofollow noopener noreferrer">
      Twitter
    </a>
    <a
      :href="`https://www.facebook.com/share.php?t=${text}&u=${url}`"
      target="_blank"
      class="share-button share-button-facebook"
      rel="nofollow noopener noreferrer">
      Facebook
    </a>
    <a
      :href="`https://getpocket.com/edit?&url=${url}`"
      target="_blank"
      class="share-button share-button-pocket"
      rel="nofollow noopener noreferrer">
      Pocket
    </a>
    <a
      :href="`https://plus.google.com/share?title=${text}&url=${url}`"
      target="_blank"
      class="share-button share-button-google"
      rel="nofollow noopener noreferrer">
      Google+
    </a>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: '',
      required: true
    },
    text: {
      type: String,
      default: '',
      required: true
    },
    tags: {
      type: Array,
      default: function () { return [] }
    }
  },
  computed: {
    formattedTags () {
      return this.tags.join(',')
    }
  }
}
</script>

<style lang="scss">
$color-twiter: #146A9E !default;
$color-facebook: #3D589C !default;
$color-pocket: #DD0E1E !default;
$color-google: #DC2419 !default;
$color-bright: #fafafa !default;

.share-buttons {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  .share-button {
    display: inline-block;
    border-radius: .25rem;
    color: $color-bright;
    padding: 1rem .5rem;
    transition: all .5s;
  }
  .share-button-twitter {
    border: 1px solid $color-twiter;
    background-color: $color-twiter;
    &:hover {
      background-color: $color-bright;
      color: $color-twiter;
    }
  }
  .share-button-facebook {
    border: 1px solid $color-facebook;
    background-color: $color-facebook;
    &:hover {
      background-color: $color-bright;
      color: $color-facebook;
    }
  }
  .share-button-pocket {
    border: 1px solid $color-pocket;
    background-color: $color-pocket;
    &:hover {
      background-color: $color-bright;
      color: $color-pocket;
    }
  }
  .share-button-google {
    border: 1px solid $color-google;
    background-color: $color-google;
    &:hover {
      background-color: $color-bright;
      color: $color-google;
    }
  }
}
</style>
