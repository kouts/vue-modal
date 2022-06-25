import App from './App.vue'
import Default from './layouts/default/Default.vue'
import Modal from '@/Modal.vue'
import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'

const app = createApp(App)

app.component('LayoutDefault', Default)
app.component('Modal', Modal)

app.use(store)
app.use(router)
app.mount('#app')
