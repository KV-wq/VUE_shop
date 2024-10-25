<script setup>
import CardList from '@/components/CardList.vue'
import Loading from '@/components/Loading.vue'
import { inject, onMounted, ref } from 'vue'
const isLoading = inject('isLoading')

const favorites = JSON.parse(localStorage.getItem('favourites')) || []
</script>

<template>
  <Loading v-if="isLoading" />
  <div
    v-else-if="!favorites.length"
    class="flex text-center justify-center items-center gap-7 flex-col"
  >
    <img src="/broken.svg" width="20%" alt="broken-heart" />
    <span class="text-2xl font-medium text-slate-700">У вас пока нет избранных товаров</span>
  </div>
  <div v-else>
    <h2 class="text-3xl font-bold">Мои закладки</h2>
    <CardList :items="favorites" :favorite-list="true" />
  </div>
</template>
