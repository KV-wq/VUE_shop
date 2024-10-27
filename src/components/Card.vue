<script setup>
import { ref } from 'vue'
import Loading from './Loading.vue'

const props = defineProps({
  img: String,
  title: String,
  price: Number,
  isFavourite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  id: Number,
  onClickFavourite: Function
})
const isLoading = ref(true)
const handleImageLoad = () => {
  isLoading.value = false
}
</script>
<template>
  <div
    class="flex flex-col justify-between dark:text-black relative bg-[#ffffff] border border-slate-200 rounded-2xl p-8 transition hover:-translate-y-2 hover:shadow-xl max-[900px]:hover:shadow-none max-[900px]:hover:-translate-y-0 max-[900px]:active:shadow-xl max-[900px]:active:-translate-y-2"
  >
    <img
      v-if="onClickFavourite"
      @click="onClickFavourite"
      :src="!isFavourite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like"
      class="absolute top-8 left-8 cursor-pointer"
    />
    <router-link :to="'product?' + id">
      <Loading
        v-if="isLoading"
        class="min-[1900px]:w-[27rem] min-[1900px]:max-h-[25rem] h-[10rem] bg-gray items-center"
      />
      <img
        v-show="!isLoading"
        :src="img"
        alt="Sneakers"
        class="min-[1900px]:w-[27rem] min-[1900px]:max-h-[25rem]"
        @load="handleImageLoad"
      />

      <p class="mt-2 text-xs sm:text-lg transition-all hover:scale-[1.02]">
        {{ title }}
      </p>
    </router-link>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-500">Цена:</span>
        <b class="text-xs sm:text-lg">{{ price }} руб.</b>
      </div>
      <img
        v-if="onClickAdd"
        @click="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
        class="cursor-pointer transition"
      />
    </div>
  </div>
</template>
<style scoped></style>
