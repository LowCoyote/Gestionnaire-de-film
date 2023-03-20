<script setup lang="ts">
import Header from "./components/layouts/Header.vue";
</script>

<template>
  <Header/>
  <div class="h-full w-full">
    <router-view />
  </div>
</template>
