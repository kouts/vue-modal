import './styles/styles.scss'
import { defineClientConfig } from '@vuepress/client'
import { Modal, modalPlugin } from '@/index'
import Example1 from './components/Example1.vue'
import Example2 from './components/Example2.vue'
import Intro from './components/Intro.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(modalPlugin)
    app.component('Modal', Modal)
    app.component('Example1', Example1)
    app.component('Example2', Example2)
    app.component('Intro', Intro)
  },
  setup() {
    // noop
  },
  rootComponents: [],
})
