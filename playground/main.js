import { createApp } from 'vue'
import { Modal, modalPlugin } from '@/index'
import App from './App.vue'
import Default from './layouts/default/Default.vue'
import { router } from './router'
import { store } from './store'

const app = createApp(App)

app.component('LayoutDefault', Default)
app.component('Modal', Modal)

app.use(store)
app.use(router)
app.use(modalPlugin)
app.mount('#app')
