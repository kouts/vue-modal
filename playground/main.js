import App from './App.vue'
import Modal from '@/Modal.vue'
import Vue from 'vue'
import router from './router'

Vue.config.productionTip = false

// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Modal', Modal)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
