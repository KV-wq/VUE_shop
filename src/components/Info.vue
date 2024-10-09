<script setup>
defineProps({
  title: String,
  description: String,
  img: String
})
</script>
<template>
  <div class="flex flex-col text-center items-center mt-48">
    <img height="90" width="90" :src="img" alt="Info image" />
    <h2 class="mt-4 text-2xl font-medium mb-2">{{ title }}</h2>
    <p class="text-gray-700">{{ description }}</p>
  </div>
</template>
