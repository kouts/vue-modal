import Vue from 'vue'
import Modal from '@/Modal.vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.component('Modal', Modal)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
