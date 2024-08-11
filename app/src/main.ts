import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useUserStore } from '@/stores/user'

import App from './App.vue'
import router from './routes'
import auth from './services/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)
useUserStore()

if (auth.IsLogged) {
  auth.updateUserInfo(auth.USER_ID as string)
}

app.mount('#app')
