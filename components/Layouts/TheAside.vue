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
      <div>
        <ul class="post-list">
          <li
            v-for="post in posts"
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
                <p class="post-title">
                  {{ post.fields.title }}
                </p>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div>
        <ul class="category-list">
          <li
            v-for="category in categories"
            :key="category.sys.id"
            class="post-list-item">
            <nuxt-link
              :to="{name: 'posts', query: {category: category.sys.id }}"
              class="post-link"
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
    fetchPosts () {
      return contentfulClient.getEntries({
        content_type: 'post',
        order: '-fields.publishedAt',
        limit: 5
      })
    },
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
  .aside-container {
    width: 100%;
    height: 100%;
  }
  .search-form {
    input {
      @include input();
    }
    button {
      @include button();
    }
  }
}
</style>
