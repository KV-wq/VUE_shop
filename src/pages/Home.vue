<script setup>
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import CardList from '../components/CardList.vue'
import Slider from '@/components/Slider.vue'
import debounce from 'lodash.debounce'
import Loading from '@/components/Loading.vue'
import Oferta from '@/components/Oferta.vue'

const addToCarts = inject('addToCarts')
const items = inject('items')
const fetchCart = inject('fetchCart')
const fetchFavourites = inject('fetchFavourites')

const isLoading = inject('isLoading')

onMounted(fetchFavourites)

const filters = reactive({
  sortBy: '',
  searchQuery: '',
  category: '*'
})

watch(filters, async () => {
  try {
    const { data } = await axios.get(
      'https://e5e2fa5636b51605.mokky.dev/gifts?sortBy=' +
        filters.sortBy +
        '&pol=' +
        filters.category +
        '&title=*' +
        filters.searchQuery +
        '*'
    )

    items.value = data
    isLoading.value = false
    fetchFavourites()
    fetchCart()
  } catch (error) {
    alert(error.message)
  }
})

const categoryName = ref('Все подарки')

watch(filters, () => {
  if (filters.category === '*') {
    categoryName.value = 'Все подарки'
  } else if (filters.category === 'female') {
    categoryName.value = 'Подарки для неё'
  } else if (filters.category === 'male') {
    categoryName.value = 'Подарки для него'
  } else if (filters.category === 'child') {
    categoryName.value = 'Подарки для детей '
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
  <button
    class="fixed bottom-5 left-5 rounded-full w-12 h-12 transition z-10 transition-color hover:shadow-xl active:scale-90"
  >
    <a href="https://t.me/gift_shop_new_year" target="_blank">
      <img src="/telegram.svg" class="mx-auto" alt="Telegram" title="Наш телеграм канал"
    /></a>
  </button>
  <Loading v-if="isLoading" />
  <div v-else class="relative">
    <!-- <Slider class="rounded mb-4" /> -->
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-bold">{{ categoryName }}</h2>

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
    <div class="flex justify-between items-center mt-4">
      <h3 class="text-xl font-bold">Категории</h3>
      <div class="flex gap-4 text-lg">
        <button
          :class="{ 'border-b-2 border-green-600 scale-105': filters.category === '*' }"
          @click="filters.category = '*'"
        >
          Все
        </button>
        <button
          :class="{ 'border-b-2 border-green-600 scale-105': filters.category === 'female' }"
          @click="filters.category = 'female'"
        >
          Для неё
        </button>
        <button
          :class="{ 'border-b-2 border-green-600 scale-105': filters.category === 'male' }"
          @click="filters.category = 'male'"
        >
          Для него
        </button>
        <button
          :class="{ 'border-b-2 border-green-600 scale-105': filters.category === 'child' }"
          @click="filters.category = 'child'"
        >
          Детские
        </button>
      </div>
    </div>
    <CardList :items="items" @add-to-carts="addToCarts" />

    <footer
      class="h-34 pb-2 rounded-t-3xl shadow-2xl w-full absolute mt-20 bg-green-800 flex flex-col text-center items-center pt-4 text-slate-900/25 select-none"
    >
      <a
        class="text-slate-300 select-text flex gap-2 max-[800px]:text-lg"
        href="https://t.me/vue_shop"
        target="_blank"
        ><img src="/telegram.svg" alt="telegram" width="20" />t.me/vue_shop</a
      >
      <a
        href="mailto:vue.shop@mail.ru"
        target="_blank"
        class="text-slate-300 select-text flex gap-2 max-[800px]:text-lg"
      >
        <img src="/email.svg" alt="email" width="20" />vue.shop@mail.ru
      </a>
      <!-- <div class="text-slate-400 text-wrap">
        <Oferta />
      </div>
      <p>+7-993-395-39-31</p>
      <p>ИНН: 541500228607</p>
      <p>Вахитов Константин Равильевич</p> -->
    </footer>
  </div>
</template>
<style scoped>
.zalupa {
  @media (max-width: 800px) {
    max-width: 130px !important;
  }
}
</style>
