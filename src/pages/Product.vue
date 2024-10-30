<script setup>
import axios from 'axios'
import { inject, onMounted, ref } from 'vue'
import SliderProduct from '@/components/SliderProduct.vue'
import Loading from '@/components/Loading.vue'

const favorites = JSON.parse(localStorage.getItem('favourites')) || []
const carts = JSON.parse(localStorage.getItem('carts')) || []

const productId = window.location.href.split('?')[1]
const isAdded = ref(carts.some((cart) => cart.id == productId))
const isFavourite = ref(favorites.some((favorites) => favorites.id == productId))
const product = ref({})
const isLoading = inject('isLoading')
const addToCart = inject('addToCarts')

const handleAddToCart = (a) => {
  addToCart(a)
  isAdded.value = !isAdded.value
}

setTimeout(() => {
  window.scrollTo({
    top: 150,
    behavior: 'smooth'
  })
}, 700)

const addFavourite = inject('addToFavourite')

const addToFavourite = (a) => {
  addFavourite(a)
  isFavourite.value = !isFavourite.value
}

onMounted(async () => {
  try {
    const { data } = await axios.get('https://e5e2fa5636b51605.mokky.dev/gifts/' + productId)
    product.value = data
    product.value.isAdded = isAdded.value
    product.value.isFavourite = isFavourite.value
    isLoading.value = false
  } catch (e) {
    alert(e.message)
  }
})
</script>

<template>
  <Loading v-if="isLoading" />
  <div v-else>
    <h1 class="text-3xl font-semibold underline underline-offset-4">{{ product.title }}</h1>
    <div class="w-full h-full grid grid-cols-2 mx-auto mt-5">
      <div class="flex flex-col h-full items-center justify-center">
        <SliderProduct :images="product.images" />
      </div>
      <div class="flex flex-col justify-between">
        <div class="ml-5">
          <p class="font-bold text-xl mb-2">Описание:</p>
          <p class="text-lg max-[600px]:text-sm">
            {{ product.description }}
          </p>
        </div>
        <div class="ml-5 mb-2">
          <p class="text-xl font-bold">Цена: {{ product.price }} ₽</p>
          <div class="flex gap-4">
            <button
              v-if="!isAdded"
              @click="handleAddToCart(product)"
              class="px-3 py-2 bg-[#47D494] text-white rounded-lg text-lg font-semibold hover:-translate-y-1 transition-all mt-3"
            >
              Добавить в корзину
            </button>
            <button
              v-else
              @click="handleAddToCart(product)"
              class="px-3 py-2 bg-[#E05749] text-white rounded-lg text-lg font-semibold hover:-translate-y-1 transition-all mt-3"
            >
              Удалить из корзины
            </button>
            <img
              @click="addToFavourite(product)"
              :src="!isFavourite ? '/like-1.svg' : '/like-2.svg'"
              alt="Like"
              class="cursor-pointer w-11 mt-3"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-decoration-color: #47d494;
}
</style>
