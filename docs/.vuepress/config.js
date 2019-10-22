module.exports = {
  base: '/public/',
  title: 'vue-modal',
  description: 'A modal plugin for Vue',
  themeConfig: {
    nav: [{ text: 'Home', link: '/' }],
    sidebar: [['/', 'Home'], ['/features/', 'Features']]
  },
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: '/src/assets/css/styles.css'
      }
    ]
  ]
};
