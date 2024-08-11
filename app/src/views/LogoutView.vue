<script setup lang="ts">
import AuthServices from '@/services/auth'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
function logout() {
    AuthServices.logout();
}
</script>

<template>
    <div v-if="userStore.IsLogged">
        <p>Already logged.</p>
        <p><button v-on:click="logout">LogOut</button></p>
    </div>
</template>
