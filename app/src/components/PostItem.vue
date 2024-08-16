<script setup lang="ts">
import type Post from '@/models/Post';

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="message">
    <div class="author">{{ post.user.userName }}</div>
    <div>{{ post.message }}</div>
  </div>
</template>

<style lang="scss" scoped>
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
  content: ':';
  width: 1em;
  height: 1em;
  position: absolute;
  right: -0.5em;
}
</style>
