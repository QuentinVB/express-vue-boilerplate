<script setup lang="ts">
import { useToast } from 'vue-toast-notification'
import AuthServices from '@/services/auth'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
const $toast = useToast()
const userStore = useUserStore()
const userEmail = ref('')

function register() {
  const credentials = {
    userEmail: userEmail.value,
  }

  AuthServices.requestPasswordRecuperation(credentials.userEmail)
    .then(msg => {
      $toast.success(msg);
    })
    .catch(err => {
      $toast.error(err);
    })
}
</script>

<template>
  <div v-if="userStore.IsLogged">
    <p>Already logged in.</p>
  </div>
  <div v-else>
    <h1>Mot de passe oublié</h1>
    <p>Saissisez votre e-mail, un lien vous sera envoyé pour ré-initialiser votre mot de passe.</p>
    <form @submit.prevent="register">
      <p><label>Email</label><input v-model="userEmail" placeholder="userEmail" type="email" /></p>
      <p>
        <button type="submit">Envoyer</button>
      </p>
    </form>
  </div>
</template>
