<template>
  <aside id="aside">
    <div class="aside-container">
      <div class="search-form">
        <input
          type="text"
          placeholder="検索する">
        <button>
          検索
        </button>
      </div>
      <div class="aside-list">
        <div class="aside-list-title">
          最近の記事一覧
        </div>
        <ul class="aside-list-posts">
          <li
            v-for="post in posts"
            :key="post.sys.id">
            <nuxt-link
              :to="`/posts/${post.sys.id}`"
              :title="post.fields.title">
              <span class="post-title">
                {{ post.fields.title }}
              </span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="aside-list">
        <div class="aside-list-title">
          カテゴリー一覧
        </div>
        <ul class="aside-list-categories">
          <li
            v-for="category in categories"
            :key="category.sys.id">
            <nuxt-link
              :to="{name: 'posts', query: {category: category.sys.id }}"
              :title="category.fields.name">
              {{ category.fields.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import contentfulClient from '@/plugins/contentfulClient.js'

export default {
  data () {
    return {
      posts: [],
      categories: []
    }
  },
  methods: {
    // 最近の記事を取得
    fetchPosts () {
      return contentfulClient.getEntries({
        content_type: 'post',
        order: '-fields.publishedAt',
        limit: 5
      })
    },
    // カテゴリーを取得
    fetchCategories () {
      return contentfulClient.getEntries({
        content_type: 'category',
        order: 'fields.name',
        limit: 10
      })
    }
  },
  created () {
    Promise.all([
      this.fetchPosts(),
      this.fetchCategories()
    ]).then((res) => {
      this.posts = res[0].items
      this.categories = res[1].items
    })
  }
}
</script>

<style lang="scss">
#aside {
  width: 100%;
  .aside-container {
    width: 100%;
    height: 100%;
    padding: .5rem;
  }
  .search-form {
    display: flex;
    flex-flow: row nowrap;
    input {
      @include input();
      width: 100%;
    }
    button {
      @include button();
    }
  }
  .aside-list {
    border: 1px solid $color-main;
    border-radius: .25rem;
    margin-top: 1rem;
    li {
      border-top: 1px solid rgba($color-main, .3);
      &:first-child {
        border-top: none;
      }
    }
    a {
      display: inline-block;
      width: 100%;
      padding: .5rem .25rem;
      transition: background-color .3s ease-in-out, color .3s ease-in-out;
      &:hover {
        background-color: rgba($color-main, .1);
      }
    }
  }
  .aside-list-title {
    text-align: center;
    font-size: 1.2rem;
    color: $color-light;
    background-color: $color-main;
    padding: .25rem;
  }
}

@media screen and (min-width: $width-small) {
  #aside {
    .aside-list {
      li {
        font-size: .9rem;
      }
    }
  }
}
</style>