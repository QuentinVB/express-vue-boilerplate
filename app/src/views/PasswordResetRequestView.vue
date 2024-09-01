<script setup lang="ts">
import AuthServices from '@/services/auth'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const userEmail = ref('')

function register() {
  const credentials = {
    userEmail: userEmail.value,
  }

  AuthServices.requestPasswordRecuperation(credentials.userEmail).then((_) => {
    console.info('Email successfully send')
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
