<template>
  <div
    id="pages-home"
    class="main-container">
    <ThePostList
      :posts="posts"/>
    <div class="more-posts">
      <nuxt-link
        to="/posts">
        過去の記事を見る
      </nuxt-link>
    </div>
  </div>
</template>

<script>
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
  // サーバーサイドレンダリング(Promiseを使うパターン)
  // この中ではthisでmethodsを参照できないため孤立して実装
  asyncData () {
    const fetchParams = {
      content_type: 'post',
      order: '-fields.publishedAt',
      limit: 5
    }
    return contentfulClient.getEntries(fetchParams).then((res) => {
      return {
        posts: res.items
      }
    })
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
