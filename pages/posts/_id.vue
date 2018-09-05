<template>
  <div
    id="pages-posts-id"
    class="main-container">
    <article>
      <header class="post-header">
        <time
          class="post-datetime"
          :datetime="formattedPost.fields.publishedAt">
          {{ formattedPost.fields.publishedAt }}
        </time>
        <h1 class="post-title">{{ formattedPost.fields.title }}</h1>
        <ul
          v-if="formattedPost.fields.categories"
          class="post-categories">
          <li
            v-for="category in formattedPost.fields.categories"
            :key="category.sys.id"
            class="post-category"
            :style="{
              'background-color': category.fields.color
            }
            ">
            {{ category.fields.name }}
          </li>
        </ul>
      </header>
      <Markdown
        class="post-content"
        v-if="formattedPost.fields.content"
        prefix="post"
        :text="formattedPost.fields.content" />
      <div
        v-else
        class="post-content-empty">
        <p>記事が未作成です</p>
        <nuxt-link to="/posts">戻る</nuxt-link>
      </div>
    </article>
    <ShareButtons
      :url="pageUrl"
      :text="formattedPost.fields.title"
      :tags="tags">
      <p class="slot-share-buttons">この記事をシェアする</p>
    </ShareButtons>
    <div class="article-aside">
      <nuxt-link
        to="/posts"
        class="link-to-posts">
        &lt; 記事一覧に戻る
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import constants from '@/assets/js/constants.js'
import contentfulClient from '@/plugins/contentfulClient.js'
import ShareButtons from '@/components/ShareButtons'
import Markdown from '@/components/Markdown'

export default {
  layout: 'default',
  components: {
    ShareButtons,
    Markdown
  },
  data () {
    return {
      post: {}
    }
  },
  computed: {
    formattedPost () {
      const post = this.post
      if (post.fields.publishedAt) {
        post.fields.publishedAt = this.$moment(post.fields.publishedAt).format(constants.datetime)
      }
      return post
    },
    tags () {
      return [constants.title]
    },
    pageUrl () {
      return `${constants.url}/posts/${this.post.sys.id}`
    }
  },
  // サーバーサイドレンダリング(Promiseを使うパターン)
  asyncData ({ params, error }) {
    // 本来ならばgetEntryを使用したいが、
    // カテゴリーをJOINできないため、複数取得する
    const fetchQuery = {
      content_type: 'post',
      'sys.id': params.id
    }
    return contentfulClient.getEntries(fetchQuery).then((res) => {
      if (res.items.length === 0) {
        return error({
          statusCode: 404,
          message: 'Page Not found',
          path: `/posts/${params.id}`
        })
      }
      return {
        post: res.items[0]
      }
    }).catch((res) => {
      error({
        statusCode: 404,
        path: `/posts/${params.id}`,
        message: 'Page Not found'
      })
    })
    // 以下は残しておく！
    // return contentfulClient.getEntry(params.id).then((response) => {
    //   return {
    //     post: response
    //   }
    // }).catch((res) => {
    //   error({
    //     statusCode: 404,
    //     path: `/posts/${params.id}`,
    //     message: 'Page Not found'
    //   })
    // })
  },
  // head要素
  head () {
    return {
      title: `${this.post.fields.title} | ${constants.title}`,
      meta: [
        // SNS Card
        { name: 'twitter:card', content: 'summary' },
        // { name: 'twitter:site', content: '' }, // アカウントを入れる
        { property: 'og:url', content: `${constants.url}/posts/${this.post.sys.id}` },
        { property: 'og:title', content: this.post.fields.title },
        { property: 'og:description', content: '' },
        { property: 'og:image', content: `${constants.url}/images/twitter_card.png` }
      ]
    }
  }
}
</script>

<style lang="scss">
#pages-posts-id {
  .post-header {
    width: 100%;
    padding: 1rem .25rem;
    background-color: rgba($color-main, .1);
    border-radius: .25rem;
  }
  .post-title {
    font-weight: bold;
    font-size: 1.8rem; // 通常のH1よりも少し小さく
    padding-top: .5rem;
  }
  .post-datetime {
    color: rgba($color-dark, .7);
    white-space: nowrap;
  }
  .post-categories {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-top: .5rem;
    .post-category {
      color: $color-light;
      background-color: rgba($color-dark, .3);
      border-radius: .25rem;
      padding: .25rem .5rem;
      margin-right: .25rem;
    }
  }
  .post-content {
    @include article-typography();
  }
  .post-content-empty {
    text-align: center;
    min-height: 60vh;
    padding-top: 2rem;
    p {
      font-size: 2rem;
    }
    a {
      @include button();
    }
  }

  // 目次
  .markdown-outline-title {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 2rem;
  }
  .markdown-outline {
    border: 1px solid rgba($color-main, .3);
    border-radius: .25rem;
    padding: 1rem .25rem;
    margin-bottom: 1rem;
    a {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .markdown-html {
    margin-top: 3rem;
  }

  // 記事一覧に戻る
  .article-aside {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding-top: 3rem;
    border-top: .1rem solid $color-dark;
    .link-to-posts {
      @include button();
    }
  }

  .share-buttons {
    text-align: center;
    padding: 2rem 0;
    border: 1px solid rgba($color-main, .3);
    border-radius: .5rem;
    margin-top: 3rem;
  }
  .slot-share-buttons {
    width:100%;
    margin-bottom:2rem;
    font-weight: bold;
  }
}
</style>
