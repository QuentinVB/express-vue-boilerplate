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
    AuthServices.login(credentials).then(_ => _);
}

</script>

<template>
    <div>
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
