<script setup lang="ts">
import router from '@/routes';
import AuthServices from '@/services/auth'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore();
const userName = ref("");
const userEmail = ref("");
const password = ref("");
const passwordConfirm = ref("");

function register() {
    const credentials = {
        userName: userName.value,
        userEmail: userEmail.value,
        password: password.value,
    };

    AuthServices.register(credentials).then(_ => {
        console.info("User successfully registered");
    });
}
</script>

<template>
    <div v-if="userStore.IsLogged">
        <p>Already logged in.</p>
    </div>
    <div v-else>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <p>
                <label>Nom d'user</label><input v-model="userName" placeholder="username" />
            </p>
            <p>
                <label>Email</label><input v-model="userEmail" placeholder="userEmail" type="email" />
            </p>
            <p>
                <label>Mot de passe</label><input v-model="password" placeholder="password" type="password" />
            </p>
            <p>
                <label>Confirmation</label><input v-model="passwordConfirm" placeholder="confirm password"
                    type="password" />
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
