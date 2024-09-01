<script setup lang="ts">
import AuthServices from '@/services/auth'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const password = ref('')
const passwordConfirm = ref('')
let userId: string = "";
let key: string = "";

let urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('id')) {
  userId = urlParams.get('id') ?? "";
}

if (urlParams.has('key')) {
  key = urlParams.get('key') ?? "";
}
//TODO il url invalid

function changePassword() {
  AuthServices.changePassword(userId, password.value, key).then((_) => {
    console.info('User password successfully changed')
  })
}
</script>

<template>
  <div v-if="userStore.IsLogged">
    <p>Already logged in.</p>
  </div>
  <div v-else>
    <h1>Changer de mot de passe</h1>
    <form @submit.prevent="changePassword">
      <p>
        <label>Nouveau mot de passe</label><input v-model="password" placeholder="password" type="password" />
      </p>
      <p>
        <label>Confirmation</label><input v-model="passwordConfirm" placeholder="confirm password" type="password" />
      </p>
      <p v-if="password.length > 0 && passwordConfirm.length > 0 && passwordConfirm !== password">
        Les 2 mot de passes ne sont pas valides
      </p>

      <p>
        <button type="submit">Changer</button>
      </p>
    </form>
  </div>
</template>
