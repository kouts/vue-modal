import Example1 from './components/Example1.vue'
import Intro from './components/Intro.vue'
import Modal from '@/Modal.vue'
import './styles/styles.scss'

import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component('Modal', Modal)
  app.component('Example1', Example1)
  app.component('Intro', Intro)
})
