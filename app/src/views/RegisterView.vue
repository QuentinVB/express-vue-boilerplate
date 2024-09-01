<script setup lang="ts">
import { useToast } from 'vue-toast-notification';
import AuthServices from '@/services/auth'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
const $toast = useToast();
const userStore = useUserStore()
const userName = ref('')
const userEmail = ref('')
const password = ref('')
const passwordConfirm = ref('')

function register() {
  const credentials = {
    userName: userName.value,
    userEmail: userEmail.value,
    password: password.value
  }
  //TODO : add check BEFORE subimt to back !
  if (password.value.length <= 10) {
    $toast.info("Le mot de passe doit comporter 10 caractères ou plus ");
    return;
  }

  AuthServices.register(credentials).then(msg => {
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
    <h1>Register</h1>
    <form @submit.prevent="register">
      <p><label class="required-label">Nom d'user</label><input v-model="userName" placeholder="username" required />
      </p>
      <p><label class="required-label">Email</label><input v-model="userEmail" placeholder="userEmail" type="email"
          required /></p>
      <p>(10 caractères min.)</p>
      <p>
        <label class="required-label">Mot de passe</label><input v-model="password" placeholder="password"
          type="password" required />
      </p>
      <p>
        <label class="required-label">Confirmation</label><input v-model="passwordConfirm"
          placeholder="confirm password" type="password" required />
      </p>
      <p v-if="password.length > 0 && passwordConfirm.length > 0 && passwordConfirm !== password">
        Les 2 mot de passes ne sont pas valides
      </p>
      <p>
        <button type="submit">Register</button>
      </p>
    </form>
  </div>
</template>
<style lang="scss" scoped>
.required-label::after {
  content: " *";
  color: red;
  font-weight: bold;
}
</style>
