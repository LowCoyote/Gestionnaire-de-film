<template>
  <div class="max-w-sm w-3/12 my-12 mx-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <router-link :to="{name: 'movieDetail', params: { id: id}}">
      <img class="rounded-t-lg h-96 w-full" :src="props.image" alt="" />
    </router-link>
    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ props.title }}</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ props.date }}</p>
      <router-link :to="{name: 'movieDetail', params: { id: id}}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        Voir le détails
        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ id: number; title: string; image: string ;date: string;}>()
</script>
