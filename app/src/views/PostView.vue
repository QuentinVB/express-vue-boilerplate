<script setup lang="ts">
//TODO switch to Composition API instead of Option API
//
import PostApiServices from '@/services/post'
import Post from '@/models/Post'
import { ref } from 'vue'

const message = ref("");

function SendMessage() {
  const post = new Post("");
  post.message = message.value;
  PostApiServices.createPostAsync(post)
    .then((res: any) => {
      console.log(res);
      message.value = "";
    })
    .catch((err: any) => {
      console.error(err);
    })
}

//  name: 'PostView',

</script>

<template>
  <div class="message">
    <h1>This is a page to ping the server</h1>
    <p style="white-space: pre-line;">{{ message }}</p>
    <textarea v-model="message" placeholder="add multiple lines"></textarea>
    <button type="button" @click="SendMessage">Send Message</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .message {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
