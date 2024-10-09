<script setup>
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
</script>
<template>
  <div
    class="flex flex-col justify-between dark:text-black relative bg-[#ffffff] border border-slate-200 rounded-2xl p-8 transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="onClickFavourite"
      @click="onClickFavourite"
      :src="!isFavourite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like"
      class="absolute top-8 left-8 cursor-pointer"
    />
    <img :src="img" alt="Sneakers" class="min-[1900px]:w-[27rem] min-[1900px]:h-[25rem]" />
    <p class="mt-2 text-xs sm:text-lg">{{ title }}</p>
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
<style lang="scss"></style>
