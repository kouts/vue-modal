import Modal from '@/Modal.vue'
import './styles/styles.scss'

import { defineClientAppEnhance } from '@vuepress/client'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.component('Modal', Modal)
})
