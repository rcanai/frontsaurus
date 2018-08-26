<template>
  <div
    id="pages-posts"
    class="main-container">
    <section >
      <header class="page-header">
        <h1 class="page-title">記事一覧</h1>
      </header>
      <div>
        <ul class="post-list">
          <li
            v-for="post in formattedPosts"
            :key="post.sys.id"
            class="post-list-item">
            <nuxt-link
              :to="`/posts/${post.sys.id}`"
              class="post-link"
              :title="post.fields.title">
              <div
                v-if="post.fields.image"
                class="post-image"
                :style="{
                  backgroundImage: `url(http:${post.fields.image.fields.file.url})`
                }"
              />
              <div
                v-else
                class="post-image empty" />
              <div class="post-detail">
                <time
                  class="post-datetime"
                  :datetime="post.fields.publishedAt">{{ post.fields.publishedAt }}</time>
                <h2 class="post-title">
                  {{ post.fields.title }}
                </h2>
                <div
                  class="post-brief"
                  v-html="post.fields.briefContent" />
              </div>
              <ul
                v-if="post.fields.categories"
                class="post-categories">
                <li
                  v-for="category in post.fields.categories"
                  :key="category.sys.id"
                  class="post-category">
                  {{ category.fields.name }}
                </li>
              </ul>
            </nuxt-link>
          </li>
        </ul>
      </div>
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
import Pagination from '@/components/Pagination'

export default {
  layout: 'default',
  components: {
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
  // 初回のみSSRされる
  computed: {
    formattedPosts () {
      this.posts.forEach((post) => {
        // 日付整形
        if (post.fields.publishedAt) {
          post.fields.publishedAt = this.$moment(post.fields.publishedAt).format(constants.datetime)
        }
      })
      return this.posts
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
  .post-list {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }
  .post-list-item {
    flex-basis: 100%;
  }
  .post-link {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-bottom: 2rem;
    border: 1px solid rgba($color-gray, .5);
    border-radius: .25rem;
    padding: .5rem;
    transition: box-shadow .3s ease-in-out;
    box-shadow: 0 0 .5rem rgba($color-gray, .5);
    &:hover {
      box-shadow: 0 0 2rem  rgba($color-gray, .7);
    }
  }
  .post-detail {
    width: 100%;
  }
  .post-title {
    word-break: break-all;
    font-size: 1.2rem;
    font-weight: bold;
    padding: .5rem 0;
  }
  .post-datetime {
    color: $color-gray;
    font-size: .9rem;
  }
  .post-brief {
    color: $color-dark;
  }
  .post-image {
    min-width: 8rem;
    width: 8rem;
    height: 8rem;
    border-radius: .25rem;
    overflow: hidden;
    background-size: cover;
    background-color: transparent;
    background-size:  cover;
    background-position: center;
    background-repeat:  no-repeat;
    &.empty {
      display: flex;
      align-items: center;
      justify-content: center;
      background: lighten($color-main, 15%);
      background: linear-gradient(225deg, lighten($color-main, 15%) 0%, lighten($color-main, 30%) 100%);
      &::after {
        content: "IMAGE";
        color: $color-light;
        word-break: break-all;
      }
    }
  }
  .post-categories {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    .post-category {
      color: $color-gray;
      border: 1px solid rgba($color-gray, .3);
      border-radius: .25rem;
      padding: .25rem .5rem;
      font-size: .9rem;
    }
  }
  .posts-pagination {
    margin: 2rem 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }
}

@media screen and (min-width: $width-small) {
  #pages-posts {
    .post-list-item {
      flex-basis: 100%; // 小さくすると2列になる
    }
    .post-image {
      min-width: 7rem;
      width: 7rem;
      height: 7rem;
    }
    .post-detail {
      width: calc(100% - 7rem);
      padding-left: 1rem;
    }
  }
}
</style>
