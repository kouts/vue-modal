import Example1 from './components/Example1.vue'
import Intro from './components/Intro.vue'
import Modal from '@/Modal.vue'
import { defineClientConfig } from '@vuepress/client'
import './styles/styles.scss'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('Modal', Modal)
    app.component('Example1', Example1)
    app.component('Intro', Intro)
  },
  setup() {
    // noop
  },
  rootComponents: []
})
