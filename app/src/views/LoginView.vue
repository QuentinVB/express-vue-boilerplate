<script setup lang="ts">
//TODO switch to Composition API instead of Option API
//
import AuthServices from '@/services/auth'
import { ref } from 'vue'

const userName = ref("");
const password = ref("");


function login() {
    const credentials = {
        userName: userName.value,
        password: password.value,
    };
    AuthServices.login(credentials).then(_ => {
        console.info("User successfully logged");
    });
}

function logout() {

    AuthServices.logout().then(_ => {
        console.info("Successfully logged out");
    });
}

</script>

<template>
    <div v-if="AuthServices.IsLogged">
        <p>Already logged.</p>
        <p><button v-on:click="logout">LogOut</button></p>
    </div>
    <div v-else>
        <h1>LOGIN</h1>
        <form @submit.prevent="login">
            <input v-model="userName" placeholder="username" />
            <br />
            <br />
            <input v-model="password" placeholder="password" type="password" />
            <br />
            <br />
            <button type="submit">Login</button>
        </form>
    </div>
</template>
