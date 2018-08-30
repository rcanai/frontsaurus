<template>
  <div class="markdown-component">
    <div class="markdown-outline-title">{{ outlineTitle }}</div>
    <ul
      v-if="outline.length > 0"
      class="markdown-outline">
      <li
        v-for="ol in outline"
        :key="ol.link">
        <a
          :href="ol.link"
          rel="nofollow">
          {{ ol.text }}
        </a>
      </li>
    </ul>
    <div
      ref="markdown-html"
      class="markdown-html"
      v-html="markdownHtml" />
  </div>
</template>

<script>
import hljs from 'highlight.js/lib/highlight'

import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import yaml from 'highlight.js/lib/languages/yaml'
import xml from 'highlight.js/lib/languages/xml'
import typescript from 'highlight.js/lib/languages/typescript'
import sql from 'highlight.js/lib/languages/sql'
import ruby from 'highlight.js/lib/languages/ruby'
import nginx from 'highlight.js/lib/languages/nginx'
import java from 'highlight.js/lib/languages/java'
import http from 'highlight.js/lib/languages/http'
import go from 'highlight.js/lib/languages/go'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import markdown from 'highlight.js/lib/languages/markdown'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('ruby', ruby)
hljs.registerLanguage('nginx', nginx)
hljs.registerLanguage('java', java)
hljs.registerLanguage('http', http)
hljs.registerLanguage('go', go)
hljs.registerLanguage('python', python)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('markdown', markdown)

export default {
  props: {
    prefix: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    outlineTitle: {
      type: String,
      default: '目次'
    }
  },
  data () {
    return {
      outline: []
    }
  },
  computed: {
    markdownHtml () {
      return this.$md.render(this.text)
    }
  },
  mounted () {
    setTimeout(() => {
      // コードをハイライト
      const $markdown = this.$refs['markdown-html']
      const $codes = $markdown.querySelectorAll('pre code')
      const $codesLength = $codes.length
      for (let i = 0; i < $codesLength; i++) {
        const _$code = $codes[i]
        const lang = _$code.className.split('-')[1]
        if (lang) {
          _$code.className = lang
        }
        hljs.highlightBlock(_$code)
      }
      // リンクを新しいタブで開く
      const $links = $markdown.querySelectorAll('a')
      const $linksLength = $links.length
      for (let i = 0; i < $linksLength; i++) {
        const _$link = $links[i]
        _$link.target = '_blank'
      }
      // 記事のh2要素から目次を作成する
      const outline = []
      const $headdings = $markdown.querySelectorAll('h2')
      const $headdingsLength = $headdings.length
      for (let i = 0; i < $headdingsLength; i++) {
        const _$headding = $headdings[i]
        _$headding.id = `${this.prefix}-headding2-${i}`
        outline.push({
          link: `#${_$headding.id}`,
          text: _$headding.innerHTML
        })
      }
      this.outline = outline
    }, 1)
  }
}
</script>

<style lang="scss">
@import '~highlight.js/styles/railscasts.css';
</style>
