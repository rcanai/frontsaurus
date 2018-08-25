const constants = require('./constants')
const contentfulClient = require('../../plugins/contentfulClient.js')

const create = async feed => {
  feed.options = {
    title: constants.title,
    link: `${constants.url}/feed.xml`,
    description: 'rss2.0 feed'
  }

  // 取得
  await contentfulClient.getEntries(
    {
      content_type: 'post',
      order: '-fields.publishedAt',
      limit: 10
    }
  ).then((res) => {
    res.items.forEach(post => {
      feed.addItem({
        title: post.fields.title,
        id: post.sys.id,
        link: `${constants.url}/posts/${post.sys.id}`,
        description: '',
        content: post.fields.briefContent
      })
    })
  })

  feed.addCategory('Nuxt.js')

  feed.addContributor({
    name: 'rcanai',
    email: '',
    link: constants.url
  })
}

exports = module.exports = create
