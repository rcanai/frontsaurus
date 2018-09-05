<template>
  <div
    id="pages-home"
    class="main-container">
    <ThePostList
      :posts="posts"/>
    <div
      v-if="showmMorePosts"
      class="more-posts">
      <nuxt-link
        :to="{name: 'posts', query: {page: 2}}">
        過去の記事を見る
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import constants from '@/assets/js/constants.js'
import contentfulClient from '@/plugins/contentfulClient.js'
import ThePostList from '@/components/Pages/ThePostList'

export default {
  layout: 'default',
  components: {
    ThePostList
  },
  data () {
    return {
      posts: []
    }
  },
  computed: {
    showmMorePosts () {
      return this.posts.length > constants.onePagePosts
    }
  },
  // サーバーサイドレンダリング(Promiseを使うパターン)
  // この中ではthisでmethodsを参照できないため孤立して実装
  asyncData () {
    const fetchParams = {
      content_type: 'post',
      order: '-fields.publishedAt',
      limit: constants.onePagePosts
    }
    return contentfulClient.getEntries(fetchParams).then((res) => {
      return {
        posts: res.items
      }
    })
  },
  head () {
    return {
      links: [
        {...constants.feedLink}
      ]
    }
  }
}
</script>

<style lang="scss">
#pages-home {
  width: 100%;
  .more-posts {
    text-align: center;
    padding: 1rem;
    a {
      @include button-outline();
    }
  }
}
</style>
