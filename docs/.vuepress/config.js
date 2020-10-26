const path = require('path')

module.exports = (options, context) => ({
  base: '/common-tools/',
  dest: 'dist',
  title: '林晓文的备忘录',
  description: 'linxiaowen Doc',
  chainWebpack(config) {
    config.resolve.alias.set('@public', path.resolve(__dirname, './public')),
      config.resolve.alias.set('@docs', path.resolve(__dirname, '../'))
  },
  theme: 'reco',
  themeConfig: {
    search: false,
    lastUpdated: 'Last Updated',
    docsDir: 'docs',
    nav: [
      { text: '首页', link: '/' },
      { text: '代码片段', link: '/pieces/' },
      { text: '关于', link: '/about/' }
    ],
  }
})
