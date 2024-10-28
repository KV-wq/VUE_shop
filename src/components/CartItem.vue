<script setup>
defineProps({
  img: String,
  title: String,
  price: Number,
  onClickRemove: Function,
  id: Number,
  count: Number,
  cartCountUp: Function,
  cartCountDown: Function
})
</script>
<template>
  <div class="hover:-translate-y-1 hover:shadow-md transition-all mb-2 mt-1 rounded-xl">
    <div
      class="bg-white z-10 flex border border-slate-200 p-4 rounded-xl gap-4 items-center transition-all"
    >
      <img class="w-20" :src="img" alt="Sneakers" />

      <div class="flex flex-col w-full">
        <a :href="'product?' + id"
          ><p class="transition hover:scale-[1.03]">{{ title }}</p></a
        >

        <div class="flex justify-between mt-2 max-[620px]:text-xs">
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
    <div
      class="bg-white flex items-end justify-center gap-3 border-slate-200 border-b border-r border-l rounded-xl h-16 -mt-12 pb-2 z-0"
    >
      <button class="px-1 bg-slate-100 text-slate-400 rounded" v-if="count == 1">▼</button>
      <button
        v-else
        @click="cartCountDown"
        class="bg-slate-100 px-1 rounded max-[700px]:hover:translate-y-0 max-[700px]:hover:bg-slate-200 hover:bg-slate-300 transition-all"
      >
        ▼
      </button>

      <span>{{ count }}</span>
      <button
        @click="cartCountUp"
        class="bg-slate-100 px-1 rounded max-[700px]:hover:translate-y-0 max-[700px]:hover:bg-slate-200 hover:bg-slate-300 transition-all"
      >
        ▲
      </button>
    </div>
  </div>
</template>
