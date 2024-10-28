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
    top: 50,
    behavior: 'smooth'
  })
}, 500)

const addFavourite = inject('addToFavourite')

const addToFavourite = (a) => {
  addFavourite(a)
  isFavourite.value = !isFavourite.value
}

onMounted(async () => {
  try {
    const { data } = await axios.get('https://e5e2fa5636b51605.mokky.dev/sneakers/' + productId)
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
        <SliderProduct class="w-full" :image-url="product.imageUrl" />
      </div>
      <div class="flex flex-col justify-between">
        <div class="ml-5">
          <p class="font-bold text-xl mb-2">Описание:</p>
          <p class="text-lg max-[600px]:text-sm">
            Визуал кроссовок Jordan Stay Loyal 3 пересекается с моделью AJ4, но все же имеет свой
            неповторимый дизайн 🔥. Пара создана из текстиля и лакированной кожи. За мягкость и
            пружистый шаг отвечает технология Nike Air.
          </p>
          <p class="font-bold text-xl mt-5">Размеры:</p>
          <div class="grid grid-cols-4 gap-4 mt-5 w-56 text-center">
            <div class="border-[2px] rounded-lg px-2 py-1">40</div>
            <div class="border-[2px] rounded-lg px-2 py-1 bg-green-300 border-green-500">41</div>
            <div class="border-[2px] rounded-lg px-2 py-1">42</div>
            <div class="border-[2px] rounded-lg px-2 py-1 bg-slate-400">43</div>
            <div class="border-[2px] rounded-lg px-2 py-1">44</div>
            <div class="border-[2px] rounded-lg px-2 py-1">45</div>
            <div class="border-[2px] rounded-lg px-2 py-1 bg-slate-400">46</div>
          </div>
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
