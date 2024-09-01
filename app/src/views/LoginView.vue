<script setup lang="ts">
import { useToast } from 'vue-toast-notification';
import router from '@/routes'
import AuthServices from '@/services/auth'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const $toast = useToast();

const userName = ref('')
const password = ref('')
const errormsg = ref('')

function login() {
  const credentials = {
    userName: userName.value,
    password: password.value
  }
  AuthServices.login(credentials)
    .then(msg => {
      $toast.success(msg);
      router.push({ name: 'post' });
    })
    .catch((e) => {
      errormsg.value = e.response.data.error;
      password.value = '';
      $toast.error("Connexion échouée !");
    })
}
</script>

<template>
  <div v-if="userStore.IsLogged">
    <p>Already logged in.</p>
  </div>
  <div v-else>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <p>
        <input v-model="userName" placeholder="username" />
      </p>
      <p>
        <input v-model="password" placeholder="password" type="password" />
      </p>
      <p style="color:red">{{ errormsg }}</p>
      <p>
        <button type="submit">Login</button>
      </p>
    </form>
    <RouterLink to="/passwordresetrequest">Mot de passe oublié ?</RouterLink>
  </div>
</template>
