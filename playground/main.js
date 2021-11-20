import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'
import Default from './layouts/default/Default.vue'
import App from './App.vue'
import Modal from '@/Modal.vue'

const app = createApp(App)
app.component('LayoutDefault', Default)
app.component('Modal', Modal)

app.use(store)
app.use(router)
app.mount('#app')
