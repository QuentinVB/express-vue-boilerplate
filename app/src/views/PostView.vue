<script setup lang="ts">
import { useToast } from 'vue-toast-notification';
import { onMounted } from 'vue'
import { ref } from 'vue'
import SendIcon from '../components/icons/IconSending.vue'
import PostApiServices from '@/services/post'
import Post from '@/models/Post'
import { useUserStore } from '@/stores/user'
import PostItem from '@/components/PostItem.vue';
const $toast = useToast();
const userStore = useUserStore()
const message = ref('')
let posts = ref<Post[]>([])

async function updatePosts() {
  posts.value = (await PostApiServices.getPostsAsync()).data
}

onMounted(async () => {
  updatePosts()
})

function SendMessage() {
  const post = new Post('')
  post.message = message.value
  PostApiServices.createPostAsync(post)
    .then(_ => {
      message.value = ''
      updatePosts();
    })
    .catch((err: any) => {
      $toast.error(err);
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
      <PostItem v-for="post in posts" v-bind:key="posts.indexOf(post)" class="message" v-bind:post="post" />
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
</style>
