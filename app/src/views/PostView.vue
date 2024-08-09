<script setup lang="ts">
//TODO switch to Composition API instead of Option API
//
import { onMounted } from 'vue';
import { ref } from 'vue'

import PostApiServices from '@/services/post'
import Post from '@/models/Post'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const message = ref("");
let posts = ref();

async function updatePosts() {
  posts.value = (await PostApiServices.getPostsAsync()).data;
}

onMounted(async () => {
  updatePosts();
})

function SendMessage() {
  const post = new Post("");
  post.message = message.value;
  PostApiServices.createPostAsync(post)
    .then(_ => {
      message.value = "";
      updatePosts();
    })
    .catch((err: any) => {
      console.error(err);
    })
}
</script>

<template>

  <div class="content">
    <p v-if="userStore.IsLogged">Logged</p>
    <p v-else>Not logged</p>

    <div v-if="userStore.IsLogged" class="message">
      <textarea v-model="message" placeholder="add multiple lines"></textarea>
      <button type="button" @click="SendMessage">Send Message</button>
    </div>

    <div class="messages">
      <p v-for="post in posts" :key="post.id">
        {{ post.user.name }} : {{ post.message }}
      </p>
    </div>
  </div>

</template>

<style>
.content {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.messages {
  display: flex;
  justify-content: start;
  flex-direction: column-reverse;
}
</style>
