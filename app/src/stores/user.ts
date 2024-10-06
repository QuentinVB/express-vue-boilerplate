import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userId = ref('')
  const userName = ref('')
  const credits = ref(0)
  const IsLogged = ref(false)
  
  function $reset() {
    userId.value = ''
    userName.value = ''
    credits.value = 0
    IsLogged.value = false
  }
  /*
  const IsLogged = computed<boolean>(()=>{
    return !AuthServices.USER_ID && !AuthServices.JWT_TOKEN
  });
  */

  return { userId, userName, credits, IsLogged, $reset }
})
