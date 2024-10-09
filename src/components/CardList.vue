<script setup>
import { inject } from 'vue'
import Card from './Card.vue'
defineProps({
  items: Array,
  favoriteList: Boolean
})
const emit = defineEmits('addToCarts')
const addToFavourite = inject('addToFavourite')
</script>
<template>
  <div class="grid grid-cols-4 gap-5 mt-10" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :img="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isFavourite="item.isFavourite"
      :onClickAdd="favoriteList ? null : () => emit('addToCarts', item)"
      :onClickFavourite="favoriteList ? null : () => addToFavourite(item)"
      :id="item.id"
      :isAdded="item.isAdded"
    />
  </div>
</template>
