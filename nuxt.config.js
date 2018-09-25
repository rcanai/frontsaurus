require('dotenv').config()
const pkg = require('./package')
const constants = require('./assets/js/constants')
const postFeed = require('./assets/js/postFeed')
const postRoutes = require('./assets/js/postRoutes')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    title: constants.title,
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
      { name: 'format-detection', content: 'telephone=no' },
      // テーマカラー
      { name: 'theme-color', content: constants.color }
    ],
    link: [
      // ファビコン
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // スマホアイコン
      { rel: 'apple-touch-icon', href: '/favicon.ico' }
    ]
  },

  /*
   ** ローディングを独自コンポーネントに置き換える
   */
  loading: '@/components/Nuxt/TheLoading.vue',

  /*
   ** Global CSS
   */
  css: [
    // トランジション
    '@/assets/css/transition.css',
    // リセット
    '@/assets/css/reset.css',
    // メイン (SCSS)
    '@/assets/scss/main.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/contentfulClient.js', ssr: true },
    { src: '@/plugins/ga.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // 変数などの共通リソースを読み込むためのプラグイン
    // Doc: https://github.com/anteriovieira/nuxt-sass-resources-loader
    'nuxt-sass-resources-loader',

    // .envを使用する
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',

    // サイトマップを作成する
    // Doc: https://github.com/nuxt-community/sitemap-module
    '@nuxtjs/sitemap',

    // マークダウンを使用する
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    '@nuxtjs/markdownit',

    // momentjsを使用する
    // Doc: https://github.com/nuxt-community/moment-module
    [
      '@nuxtjs/moment', {
        locales: ['ja'],
        plugin: true
      }
    ],

    // RSSフィードを使用する
    // Doc: https://github.com/nuxt-community/feed-module
    '@nuxtjs/feed',

    // PWAモジュール
    // Doc: https://pwa.nuxtjs.org/
    '@nuxtjs/pwa'
  ],

  // sass共通モジュールの設定
  sassResources: [
    // 変数とミックスイン
    '@/assets/scss/partials/_variables.scss',
    '@/assets/scss/partials/_mixins.scss'
  ],

  // マークダウンの設定
  markdownit: {
    preset: 'default',
    injected: true,
    linkify: true,
    breaks: true,
    html: true,
    typographer: true
  },

  // サイトマップの設定
  sitemap: {
    path: '/sitemap.xml',
    hostname: constants.url,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false, // nuxt generate で静的ファイル出力する場合にはtrueにする
    exclude: [], // 除外項目
    routes: postRoutes
  },

  // RSSフィードの設定
  feed: [
    {
      path: '/feed.xml',
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      create: postFeed
    }
  ],

  // PWA用のマニフェスト設定
  manifest: {
    name: constants.title,
    short_name: constants.title,
    lang: 'ja',
    theme_color: constants.color,
    background_color: constants.color,
    start_url: '/?launcher=true',
    display: 'standalone',
    icons: [
      {
        'src': '/icons/72.png',
        'sizes': '512x512',
        'type': 'image/png'
      }
    ]
  },

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
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },

    // ベンダープレフィックス自動付与設定
    postcss: [
      require('autoprefixer')({
        browsers: ['IE 11', 'last 2 versions'],
        grid: true,
        cascade: false
      })
    ]
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
