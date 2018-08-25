const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
 head: {
  htmlAttrs: {
    lang: 'ja'
  },
  title: ':title',
  meta: [
    // 文字コード
    { charset: 'utf-8' },
    // ビューポート
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    // 説明
    { hid: 'description', name: 'description', content: pkg.description },
    // 作者
    { name: 'author', content: 'rcanai' },
    // IE制御
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    // 電話番号リンクを抑制
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    // ファビコン
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    // スマホアイコン
    { rel: 'apple-touch-icon', href: '/favicon.ico' }
  ]
},

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /**
     * 共通モジュール
     */
    vendor: [
      'babel-polyfill'
    ],

    /**
     * Babelの設定
     */
    babel: {
      presets: [
        [
          'vue-app',
          {
            targets: { ie: 11 },
            useBuiltIns: true
          }
        ]
      ]
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  /*
   ** Vagrantを使用する際のポーリング設定
   */
  watchers: {
    webpack: {
      poll: 300
    }
  }
}
