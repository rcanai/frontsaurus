const contentfulClient = require('../../plugins/contentfulClient.js')

const postRoutes = callback => {
  // 取得
  contentfulClient.getEntries(
    {
      content_type: 'post',
      order: '-fields.publishedAt'
    }
  ).then((res) => {
    const routes = res.items.map(post => {
      return `/posts/${post.sys.id}`
    })
    callback(null, routes)
  })
}

exports = module.exports = postRoutes
