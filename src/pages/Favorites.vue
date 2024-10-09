<script setup>
import CardList from '@/components/CardList.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://e5e2fa5636b51605.mokky.dev/favourites?_relations=sneakers'
    )
    favorites.value = data.map((obj) => obj.sneaker)
    console.log(favorites.value)
  } catch (error) {
    alert(error.message)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold">Мои закладки</h2>
  <CardList :items="favorites" :favorite-list="true" />
</template>
