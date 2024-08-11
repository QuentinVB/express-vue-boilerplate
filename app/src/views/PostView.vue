<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue'
import SendIcon from '../components/icons/IconSending.vue'
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
    <div class="nav-area">
      <p v-if="userStore.IsLogged">Logged as {{ userStore.userName }}</p>
      <p v-else>Not logged</p>
      <form @submit.prevent="SendMessage" v-if="userStore.IsLogged" class="form-area">
        <input v-model="message" placeholder="your message" type="text" />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
    <div class="messages">
      <div v-for="post in posts" :key="post.id" class="message">
        <div class="author">{{ post.user.name }}</div>
        <div>{{ post.message }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  display: flex;
  place-items: center;
  place-content: center;

  color: var(--color-text);

  top: calc(50% - 25px);
  position: relative;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  border-radius: 8px;
  width: 50px;
  height: 50px;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 1024px) {
  .content {
    min-height: 100vh;
    align-items: start;
    justify-content: center;
  }
}

.nav-area {
  display: flex;
  flex-direction: column;
  flex-wrap: n;
}

.form-area {
  display: flex;
  align-items: center;
}

.messages {
  display: flex;
  justify-content: start;
  flex-direction: column-reverse;
}

.message {
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 1em;
}

.author {
  min-width: 5em;
  text-align: right;
  position: relative;
}

.author::after {
  content: ":";
  width: 1em;
  height: 1em;
  position: absolute;
  right: -0.5em;
}
</style>
