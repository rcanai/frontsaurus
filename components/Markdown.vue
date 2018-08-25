<template>
  <div
    ref="markdown-content"
    class="markdown-content"
    v-html="$md.render(text)" />
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
    text: {
      type: String,
      required: true
    }
  },
  mounted () {
    setTimeout(() => {
      // コードをハイライト
      const $content = this.$refs['markdown-content']
      const $codes = $content.querySelectorAll('pre code')
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
      const $links = $content.querySelectorAll('a')
      const $linksLength = $links.length
      for (let i = 0; i < $linksLength; i++) {
        const _$link = $links[i]
        _$link.target = '_blank'
      }
    }, 1)
  }
}
</script>

<style lang="scss">
.markdown-content {
  word-wrap: break-word;
  white-space: pre-wrap;

  /* Monokai style - ported by Luigi Maselli - http://grigio.org */
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: $color-dark;
    color: darken($color-light, 10%);
  }

  .hljs-tag,
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-literal,
  .hljs-strong,
  .hljs-name {
    color: #f92672;
  }

  .hljs-code {
    color: #66d9ef;
  }

  .hljs-class .hljs-title {
    color: $color-light;
  }

  .hljs-attribute,
  .hljs-symbol,
  .hljs-regexp,
  .hljs-link {
    color: #bf79db;
  }

  .hljs-string,
  .hljs-bullet,
  .hljs-subst,
  .hljs-title,
  .hljs-section,
  .hljs-emphasis,
  .hljs-type,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-addition,
  .hljs-variable,
  .hljs-template-tag,
  .hljs-template-variable {
    color: #a6e22e;
  }

  .hljs-comment,
  .hljs-quote,
  .hljs-deletion,
  .hljs-meta {
    color: #75715e;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-literal,
  .hljs-doctag,
  .hljs-title,
  .hljs-section,
  .hljs-type,
  .hljs-selector-id {
    font-weight: bold;
  }
}
</style>
