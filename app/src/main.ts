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
const userStore = useUserStore()

if (auth.IsLogged) {
  auth.updateUserInfo(auth.USER_ID as string).then((_) => {})
}

app.mount('#app')
