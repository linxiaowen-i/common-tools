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
      { text: '播放器', link: '/player/DPlayer/' },
      { text: '常用配置', link: '/my-setting/vscode/' },
      { text: 'webpack配置', link: '/webpack/vuecli-pack/' }
    ],
    sidebarDepth: 3,
    sidebar: {
      '/pieces/': [
        {
          title: '代码片段',
          children: ['file', 'IE11', 'date', 'clipboard']
        }
      ],
      '/player/': [{
        title: '播放器',
        collapsable: false,
        children: ['DPlayer', 'FFmpeg']
      }],
      '/my-setting/': [
        {
          title: '常用配置',
          children: ['vscode', 'npm']
        }
      ],
      '/webpack/': [
        {
          title: 'webpack配置',
          children: ['vuecli-pack', 'pack-diff']
        }
      ]
    }
  }
})
