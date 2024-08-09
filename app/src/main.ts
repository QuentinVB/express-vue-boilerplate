import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useUserStore } from '@/stores/user'

import App from './App.vue'
import router from './routes'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const userStore = useUserStore()


app.mount('#app')
