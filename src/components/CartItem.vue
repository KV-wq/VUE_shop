<script setup>
defineProps({
  img: String,
  title: String,
  price: Number,
  onClickRemove: Function,
  id: Number
})
</script>
<template>
  <div
    class="flex border border-slate-200 p-4 rounded-xl gap-4 items-center mb-2 hover:-translate-y-1 mt-1 transition-all hover:shadow-md"
  >
    <img class="w-20" :src="img" alt="Sneakers" />

    <div class="flex flex-col w-full">
      <router-link :to="'product?' + id"
        ><p class="transition hover:scale-[1.03]">{{ title }}</p></router-link
      >

      <div class="flex justify-between mt-2">
        <b>{{ price }} руб.</b>
        <img
          @click="onClickRemove"
          src="/close.svg"
          alt="Delete"
          class="transition hover:scale-110 cursor-pointer opacity-80 hover:opacity-100"
        />
      </div>
    </div>
  </div>
</template>
