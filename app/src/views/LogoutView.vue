<script setup lang="ts">
//TODO switch to Composition API instead of Option API
//
import AuthServices from '@/services/auth'
function logout() {

    AuthServices.logout()
        .then(_ => {
            console.info("Successfully logged out");
        });
}

</script>

<template>
    <div v-if="AuthServices.IsLogged">
        <p>Already logged.</p>
        <p><button v-on:click="logout">LogOut</button></p>
    </div>
</template>
