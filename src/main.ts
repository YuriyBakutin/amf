import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Vant from 'vant'
import 'vant/lib/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(Vant).use(pinia).mount('#app')
