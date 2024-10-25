<script setup>
import axios from 'axios'
import { inject, onMounted, reactive, watch } from 'vue'
import CardList from '../components/CardList.vue'
import Slider from '@/components/Slider.vue'
import debounce from 'lodash.debounce'
import Loading from '@/components/Loading.vue'

const addToCarts = inject('addToCarts')
const items = inject('items')
const fetchCart = inject('fetchCart')
const fetchFavourites = inject('fetchFavourites')

const isLoading = inject('isLoading')

onMounted(fetchFavourites)

const filters = reactive({
  sortBy: '',
  searchQuery: ''
})

watch(filters, async () => {
  try {
    const { data } = await axios.get(
      'https://e5e2fa5636b51605.mokky.dev/sneakers?sortBy=' +
        filters.sortBy +
        '&title=*' +
        filters.searchQuery +
        '*'
    )
    fetchFavourites()
    fetchCart()
    items.value = data
    isLoading.value = false
  } catch (error) {
    alert(error.message)
  }
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onSearchSelect = debounce((event) => {
  filters.searchQuery = event.target.value
}, 400)
</script>

<template>
  <Loading v-if="isLoading" />
  <div v-else>
    <Slider class="rounded" />
    <div class="flex justify-between items-center mt-4">
      <h2 class="text-3xl font-bold">Все кроссовки</h2>

      <div class="gap-5 flex items-center">
        <select class="py-2 px-3 border outline-none" @change="onChangeSelect">
          <option value="title">По названию</option>
          <option value="price">По цене ↑</option>
          <option value="-price">По цене ↓</option>
        </select>

        <div class="relative">
          <img src="/search.svg" alt="Search" class="absolute left-2 top-2" />
          <input
            @input="onSearchSelect"
            class="border border-gray-300 rounded-md p-1 pl-7 pr-2 outline-none focus:border-gray-600 zalupa"
            placeholder="Поиск.."
          />
        </div>
      </div>
    </div>
    <CardList :items="items" @add-to-carts="addToCarts" />
  </div>
</template>
<style scoped>
.zalupa {
  @media (max-width: 700px) {
    max-width: 130px !important;
  }
}
</style>
