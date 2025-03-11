import { createApp } from 'vue'
import '@/styles/style.css'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/styles/vant-classes-modified.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(Vant).use(pinia).mount('#app')
