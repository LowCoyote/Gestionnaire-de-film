<template>
  <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
    <dt class="text-sm font-medium text-gray-500">{{ props.title }}</dt>
    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ props.information }}</dd>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{title: string; information: string;}>()
</script>
