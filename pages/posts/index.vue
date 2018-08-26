<template>
  <div
    id="pages-posts"
    class="main-container">
    <section >
      <header class="page-header">
        <h1 class="page-title">記事一覧</h1>
      </header>
      <ThePostList
        :posts="posts"/>
      <div class="posts-pagination">
        <Pagination
          to="posts"
          :page="page"
          :total="postsTotal"
          :count="onePagePosts"
          :max="3" />
      </div>
    </section>
  </div>
</template>

<script>
import constants from '@/assets/js/constants.js'
import contentfulClient from '@/plugins/contentfulClient.js'
import ThePostList from '@/components/Pages/ThePostList'
import Pagination from '@/components/Pagination'

export default {
  layout: 'default',
  components: {
    ThePostList,
    Pagination
  },
  data () {
    return {
      posts: [],
      postsTotal: 0,
      onePagePosts: constants.onePagePosts,
      page: 1
    }
  },
  // サーバーサイドレンダリング(Promiseを使うパターン)
  // この中ではthisでmethodsを参照できないため孤立して実装
  // page: ページ, category: カテゴリーID, q: 検索文字列
  asyncData ({ query }) {
    const _page = Number(query.page) || 1
    const fetchParams = {
      content_type: 'post',
      order: '-fields.publishedAt',
      limit: constants.onePagePosts,
      skip: constants.onePagePosts * (_page - 1)
    }
    if (query.category) {
      fetchParams['fields.categories.sys.id'] = query.category
    }
    if (query.q) {
      fetchParams['query'] = query.q
    }
    return contentfulClient.getEntries(fetchParams).then((res) => {
      return {
        posts: res.items,
        postsTotal: res.total,
        page: _page
      }
    })
  },
  watch: {
    // URLの変更を監視
    $route ({ query }) {
      this.fetch({ query })
    }
  },
  methods: {
    fetch ({ query }) {
      const _page = Number(query.page) || 1
      const fetchParams = {
        content_type: 'post',
        order: '-fields.publishedAt',
        limit: constants.onePagePosts,
        skip: constants.onePagePosts * (_page - 1)
      }
      if (query.category) {
        fetchParams['fields.categories.sys.id'] = query.category
      }
      if (query.q) {
        fetchParams['query'] = query.q
      }
      // 取得
      return contentfulClient.getEntries(fetchParams).then((res) => {
        this.posts = res.items
        this.postsTotal = res.total
        this.page = _page
        // ページトップに移動
        document.body.scrollTop = document.documentElement.scrollTop = 0
      })
    }
  },
  // HEADタグ
  head () {
    const links = []
    if (this.page > 1) {
      links.push({ rel: 'prev', href: `/posts?page=${this.page - 1}` })
    }
    if (this.posts.length >= constants.onePagePosts) {
      links.push({ rel: 'next', href: `/posts?page=${this.page + 1}` })
    }
    return {
      title: `記事一覧 | ${constants.title}`,
      link: links
    }
  }
}
</script>

<style lang="scss">
#pages-posts {
  .posts-pagination {
    margin: 2rem 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }
}
</style>
