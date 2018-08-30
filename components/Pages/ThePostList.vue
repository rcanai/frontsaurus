<template>
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
              class="post-category"
              :style="{
                'background-color': category.fields.color
              }
              ">
              {{ category.fields.name }}
            </li>
          </ul>
          <div
            v-else
            class="post-categories">
            &nbsp;
          </div>
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
</template>

<script>
import constants from '@/assets/js/constants.js'

export default {
  props: {
    posts: {
      type: Array,
      default () { return [] },
      required: true
    }
  },
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
  }
}
</script>

<style lang="scss" scoped>
.post-list {
  .post-list-item {
    margin-bottom: 3rem;
  }
}
.post-title {
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 1.25rem;
  font-weight: bold;
  color: $color-dark;
  border: 1px solid rgba($color-main, .9);
  border-radius: .25rem;
  padding: .5rem;
  transition: background-color .3s ease-in-out, color .3s ease-in-out;
  &:hover {
    background-color: rgba($color-main, .1);
    color: $color-main;
  }
}
.post-detail {
  min-height: 10rem;
  padding: .25rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.post-datetime {
  width: 100%;
  font-size: .9rem;
  color: rgba($color-dark, .7);
  white-space: nowrap;
  margin-bottom: .25rem;
  padding: .25rem .5rem;
}
.post-categories {
  width: 100%;
  white-space: nowrap;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  .post-category {
    color: $color-light;
    background-color: $color-dark;
    border-radius: .25rem;
    padding: .25rem .5rem;
    font-size: .9rem;
    margin-bottom: .25rem;
    margin-right: .25rem;
  }
}
.post-image {
  min-width: 5rem;
  width: 5rem;
  height: 5rem;
  border-radius: .25rem;
  overflow: hidden;
  background-color: transparent;
  background-size:  contain;
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
  width: calc(100% - 5rem); // - .post-image: width
  height: 100%;
  color: rgba($color-dark, .7);
  padding-left: 1rem;
}
.read-continuation {
  width: 100%;
  text-align: right;
  padding-top: .25rem;
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

@media screen and (min-width: $width-small) {
  .post-datetime {
    width: 50%;
  }
  .post-categories {
    width: 50%;
    justify-content: flex-end;
  }
  .post-image {
    min-width: 9rem;
    width: 9rem;
    height: 9rem;
  }
  .post-brief {
    width: calc(100% - 9rem); // - .post-image: width
  }
}
</style>
