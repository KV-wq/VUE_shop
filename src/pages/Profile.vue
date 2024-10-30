<script setup>
import Loading from '@/components/Loading.vue'
import { inject, onMounted, ref, watch } from 'vue'
const isLoading = inject('isLoading')
const orders = ref([])
const orderIsCreated = inject('orderIsCreated')

watch(orderIsCreated, () => {
  try {
    // Получаем данные о заказах из LocalStorage
    const data = JSON.parse(localStorage.getItem('orders')) || [] // Преобразуем строку в массив
    console.log(data) // Логируем полученные данные

    // Обновляем orders.value, реверсируя массив
    orders.value = data.reverse()
  } catch (error) {
    console.error('Ошибка при загрузке заказов:', error) // Логируем ошибку
  }
})

onMounted(async () => {
  try {
    // Получаем данные о заказах из LocalStorage
    const data = JSON.parse(localStorage.getItem('orders')) || [] // Преобразуем строку в массив
    console.log(data) // Логируем полученные данные

    // Обновляем orders.value, реверсируя массив
    orders.value = data.reverse()
  } catch (error) {
    console.error('Ошибка при загрузке заказов:', error) // Логируем ошибку
  }
})
</script>
<template>
  <Loading v-if="isLoading" />
  <div
    v-else-if="!orders.length"
    class="flex text-center items-center justify-center flex-col gap-7"
  >
    <img src="/not-order.svg" width="20%" alt="" />
    <span class="text-2xl font-medium text-slate-700">Вы пока ничего не заказывали</span>
  </div>
  <div v-else>
    <h2 class="text-3xl font-bold">Мои заказы</h2>

    <div
      v-for="order in orders"
      :key="order.id"
      class="w-auto h-auto border-[1px] border-slate-300 rounded-lg p-4 mt-5 hover:border-slate-500 text-xl flex flex-col"
    >
      <div class="flex justify-between">
        <div class="flex gap-2 items-center">
          <h1 class="border border-slate-200 px-3 py-2 rounded-2xl">Заказ #{{ order.orderId }}</h1>
          <h1
            class="border border-orange-300 px-3 py-2 rounded-2xl max-w-52 text-base bg-[#fceede]"
          >
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
          <img class="w-20" :src="item.imageUrl" alt="Gifts" />

          <div class="flex flex-col w-full">
            <p>{{ item.title }}</p>

            <div class="flex justify-between mt-2">
              <b>{{ item.price }} руб.</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
