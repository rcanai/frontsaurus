<template>
  <div
    id="pages-home"
    class="main-container">
    <ul class="post-list">
      <li
        v-for="post in formattedPosts"
        :key="post.sys.id"
        class="post-list-item">
        <section>
          <div>
            <nuxt-link
              :to="`/posts/${post.sys.id}`"
              class="post-title"
              :title="post.fields.title">
              {{ post.fields.title }}
            </nuxt-link>
          </div>
          <div class="post-detail">
            <time
              class="post-datetime"
              :datetime="post.fields.publishedAt">
              投稿日時：{{ post.fields.publishedAt }}
            </time>
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
            <div
              v-if="post.fields.image"
              class="post-image"
              :style="{
                backgroundImage: `url(https:${post.fields.image.fields.file.url})`
              }"
            />
            <div
              v-else
              class="post-image empty" />
            <div
              class="post-brief"
              v-html="post.fields.briefContent" />
          </div>
          <div class="read-continuation">
            <nuxt-link
              :to="`/posts/${post.sys.id}`"
              :title="post.fields.title">
              続きを読む
            </nuxt-link>
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import constants from '@/assets/js/constants.js'
import contentfulClient from '@/plugins/contentfulClient.js'

export default {
  layout: 'default',
  data () {
    return {
      posts: []
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
        // 改行コード
        if (post.fields.briefContent) {
          post.fields.briefContent = post.fields.briefContent.replace(/\r?\n/g, '<br>')
        }
      })
      return this.posts
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
  }
}
</script>

<style lang="scss">
#pages-home {
  width: 100%;
  .post-list {
    .post-list-item {
      margin-bottom: 2rem;
    }
  }
  .post-title {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 1.25rem;
    color: $color-light;
    background-color: rgba($color-main, .9);
    border-radius: .25rem;
    padding: .5rem;
    transition: background-color .3s ease-in-out;
    &:hover {
      background-color: rgba($color-sub, .9);
    }
  }
  .post-detail {
    height: 10rem;
    padding: .25rem;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  .post-datetime {
    color: $color-gray;
    font-size: .9rem;
    width: 50%;
  }
  .post-categories {
    width: 50%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    .post-category {
      color: $color-gray;
      border: 1px solid rgba($color-main, .3);
      border-radius: .25rem;
      padding: .25rem .5rem;
      font-size: .9rem;
    }
  }
  .post-image {
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
  .post-brief {
    width: calc(100% - 8rem);
    color: rgba($color-dark, .9);
    padding-left: 1rem;
  }
  .read-continuation {
    width: 100%;
    text-align: right;
    a {
      color: $color-main;
      border: 1px solid $color-main;
      border-radius: .25rem;
      padding: .25rem .5rem;
      transition: color .3s ease-in-out, background-color .3s ease-in-out;
      &:hover {
        background-color: $color-main;
        color: $color-light;
      }
    }
  }
}
</style>
