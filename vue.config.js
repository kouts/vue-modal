// Vue config for the playground

const path = require('path')

const playgroundPath = path.resolve(__dirname, 'playground')

module.exports = {
  lintOnSave: 'warning',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@playground/scss/variables.scss";
        `
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@playground': playgroundPath
      }
    }
  },
  chainWebpack: (config) => {
    // Clear the existing entry point
    config.entry('app').clear()

    // Add the playground entry point
    config.entry('app').add('./playground/main.js')

    config.plugin('html').tap((args) => {
      args[0].template = 'playground/public/index.html'
      args[0].title = 'vue-modal playground'
      args[0].meta = { description: 'Playground for vue-modal Vue.js 2' }

      return args
    })
  }
}
