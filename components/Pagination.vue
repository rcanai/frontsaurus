<template>
  <ul
    class="pagination"
    v-if="total > 0 && !(page > max)">

    <li
      class="pagination-link to-prev"
      v-if="page > 1"
      @click="pagination(page - 1)">
      <span class="link-text">&lt;</span>
    </li>
    <li
      class="pagination-link to-prev disabled"
      v-else>
      <span class="link-text">&lt;</span>
    </li>

    <li
      v-for="link in links"
      :key="link"
      class="pagination-link"
      :class="{
        'active': link === page
      }"
      @click="pagination(link)">
      <span class="link-text">{{ link }}</span>
    </li>

    <li
      class="pagination-link to-next"
      v-if="(page < max && page < links.length)"
      @click="pagination(page + 1)">
      <span class="link-text">&gt;</span>
    </li>
    <li
      class="pagination-link to-next disabled"
      v-else>
      <span class="link-text">&gt;</span>
    </li>

  </ul>
</template>

<script>
export default {
  props: {
    // 行き先
    to: {
      type: String,
      default: '/'
    },
    // 現在のページ
    page: {
      type: Number,
      default: 1
    },
    // すべてのエントリーの量
    total: {
      type: Number,
      default: 0
    },
    // 1ページの量
    count: {
      type: Number,
      default: 1
    },
    // ページネーションの最大量
    max: {
      type: Number,
      default: 3
    }
  },
  computed: {
    /**
     * @returns {Array} ページネーション
     */
    links () {
      const _links = []
      const _start = this.page
      const _lastIndex = Math.ceil(this.total / this.count)
      for (let i = 0; i < this.max; i++) {
        const _index = i + _start
        if (_index > _lastIndex) break
        _links.push(_index)
      }
      if (_links.length < this.max) {
        for (let i = (_links[0] - 1); i >= 1; i--) {
          if (_links.length >= this.max) break
          _links.unshift(i)
        }
      }
      return _links
    }
  },
  methods: {
    pagination (page = 1) {
      this.$router.push({
        name: this.to,
        query: {
          // 現在のクエリー文字列を結合する
          ...this.$route.query,
          page: page
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  user-select: none;
  .pagination-link {
    margin-right: 1rem;
    .link-text {
      display: inline-block;
      border: 1px solid $color-main;
      background-color: $color-light;
      color: $color-main;
      border-radius: .25rem;
      text-align: center;
      font-weight: bold;
      min-width: 2rem;
      transition: all .3s ease-in-out;
      line-height: 2rem;
      cursor: pointer;
    }
    &.disabled {
      .link-text {
        background-color: rgba($color-dark, .1) !important;
        color: rgba($color-dark, .5) !important;
        border-color: rgba($color-dark, .5) !important;
        cursor: not-allowed;
      }
    }
  }
  .pagination-link:hover,
  .pagination-link.active {
    .link-text {
      background-color: $color-main;
      color: $color-light;
    }
  }
  .to-prev,
  .to-next {
    background-color: $color-light !important;
    color: $color-main !important;
  }
}
</style>
