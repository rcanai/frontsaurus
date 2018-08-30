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
.share-buttons {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  .share-button {
    display: inline-block;
    border-radius: .25rem;
    color: #fafafa;
    padding: 1rem .5rem;
    transition: all .5s;
  }
  .share-button-twitter {
    border: 1px solid #22A0F2;
    color: #22A0F2;
    &:hover {
      background-color: #22A0F2;
      color: #fafafa;
    }
  }
  .share-button-facebook {
    border: 1px solid #3D589C;
    color: #3D589C;
    &:hover {
      background-color: #3D589C;
      color: #fafafa;
    }
  }
  .share-button-pocket {
    border: 1px solid #F14454;
    color: #F14454;
    &:hover {
      background-color: #F14454;
      color: #fafafa;
    }
  }
  .share-button-google {
    border: 1px solid #E94438;
    color: #E94438;
    &:hover {
      background-color: #E94438;
      color: #fafafa;
    }
  }
}
</style>
