<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const orders = ref([])

onMounted(async () => {
  const { data } = await axios.get('https://e5e2fa5636b51605.mokky.dev/orders')
  orders.value = data
})
</script>
<template>
  <h2 class="text-3xl font-bold">Мой профиль</h2>

  <div
    v-for="order in orders"
    :key="order.id"
    class="w-auto h-auto border-[1px] border-slate-300 rounded-lg p-4 mt-5 hover:border-slate-500 text-xl flex flex-col"
  >
    <div class="flex justify-between">
      <div class="flex gap-2 items-center">
        <h1 class="border border-slate-200 px-3 py-2 rounded-2xl max-w-28">
          Заказ #{{ order.id }}
        </h1>
        <h1 class="border border-orange-300 px-3 py-2 rounded-2xl max-w-52 text-base bg-[#fceede]">
          Статус: в обработке
        </h1>
      </div>
      <button
        class="border border-blue-200 rounded-full p-2 text-base bg-blue-50 hover:bg-blue-200 hover:-translate-y-1 transition-all"
      >
        <img src="/info.svg" alt="Info" width="30" />
      </button>
    </div>
    <div v-for="item in order.items" :key="item.id" v-auto-animate>
      <div
        class="flex p-3 rounded-xl gap-2 items-center hover:-translate-y-1 mt-1 transition-all hover:shadow-md"
      >
        <img class="w-20" :src="item.imageUrl" alt="Sneakers" />

        <div class="flex flex-col w-full">
          <p>{{ item.title }}</p>

          <div class="flex justify-between mt-2">
            <b>{{ item.price }} руб.</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
