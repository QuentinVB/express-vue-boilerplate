<script setup lang="ts">
//TODO switch to Composition API instead of Option API
//
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
