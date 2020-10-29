const path = require('path')

module.exports = (options, context) => ({
  base: '/common-tools/',
  dest: 'dist',
  title: '林晓文的备忘录',
  description: 'linxiaowen Doc',
  chainWebpack(config) {
    config.resolve.alias.set('@public', path.resolve(__dirname, './public'))
  },
  theme: 'reco',
  themeConfig: {
    search: false,
    lastUpdated: 'Last Updated',
    docsDir: 'docs',
    nav: [
      { text: '首页', link: '/' },
      { text: '代码片段', link: '/pieces/file/' },
      { text: '播放器', link: '/player/' },
      { text: '常用配置', link: '/my-setting/vscode' }
    ],
    sidebar: {
      '/pieces/': [
        {
          title: '文件操作',
          children: ['file']
        }
      ],
      '/player/': [{
        title: '播放器',
        collapsable: false,
        children: ['DPlayer', 'FFmpeg']
      }],
      '/pieces/': [
        {
          title: '代码片段',
          children: ['file', 'IE11', 'date']
        }
      ],
      '/my-setting/': [
        {
          title: '个人常用',
          children: ['vscode', 'npm']
        }
      ]
    }
  }
})
