<script setup lang="ts">
import { useToast } from 'vue-toast-notification';
import AuthServices from '@/services/auth'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore();
const $toast = useToast();

function logout() {
  AuthServices.logout()
    .then(msg => {
      $toast.success(msg);
    })

}

</script>

<template>
  <div v-if="userStore.IsLogged">
    <p>Already logged.</p>
    <p><button v-on:click="logout">LogOut</button></p>
  </div>
</template>
