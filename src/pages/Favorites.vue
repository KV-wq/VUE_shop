<script setup>
import CardList from '@/components/CardList.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const favorites = JSON.parse(localStorage.getItem('favourites')) || []
</script>

<template>
  <h2 class="text-3xl font-bold">Мои закладки</h2>
  <CardList :items="favorites" :favorite-list="true" />
</template>
