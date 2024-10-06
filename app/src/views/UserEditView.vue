<script setup lang="ts">
import { useToast } from 'vue-toast-notification';
import UserApiServices from '@/services/user'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const $toast = useToast();

const username = ref('');
const profilePic = ref(null);
// Gérer la sélection de fichier
const handleFileUpload = (event) => {
  profilePic.value = event.target.files[0];
};

// Soumettre le formulaire
const submitForm = async () => {
  const form = new FormData();
  form.append('username', username.value);
  form.append('profilePic', profilePic.value);

  try {
    const response = await UserApiServices.updateUserAsync(userStore.userId, form)
    $toast.success('Profil mis à jour avec succès:');
    console.log('Profil mis à jour avec succès:', response.data);
  } catch (error) {
    $toast.error("Erreur lors de la mise à jour du profil");
    console.error('Erreur lors de la mise à jour du profil:', error);
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" v-model="username" id="username" />
      </div>

      <div>
        <label for="profilePic">Image de profil:</label>
        <input type="file" @change="handleFileUpload" id="profilePic" />
      </div>

      <button type="submit">Mettre à jour</button>
    </form>
  </div>
</template>