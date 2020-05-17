module.exports = {
  dest: 'demo',
  // base: '/vue-modal/demo/',
  // base: '/demo/',
  title: 'vue-modal',
  description: 'A modal plugin for Vue',
  themeConfig: {
    nav: [
      { text: 'Github', link: 'https://github.com/kouts/vue-modal' }
    ],
    sidebar: [
      ['/', 'Introduction'],
      ['/installation/', 'Installation'],
      ['/usage/', 'Usage'],
      ['/options/', 'Options']
    ]
  },
  head: [
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=Array.from' }
    ],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=Promise' }
    ],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=NodeList.prototype.forEach' }
    ],
    [
      'script',
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=Object.assign' }
    ]
  ]
};
