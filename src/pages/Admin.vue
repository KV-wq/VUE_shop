<script setup>
import axios from 'axios'
import { inject, ref, watch } from 'vue'

const items = inject('items')
watch(items, () => {
  Id.value = items.value.length + 1
  console.log(items)
})
const onChangeSelect = (event) => {
  category.value = event.target.value
}

const isSubmit = ref(false)

const Id = ref()
const title = ref('')
const description = ref('')
const price = ref()
const category = ref('female')
const countImg = ref()

const createProduct = async () => {
  const item = {
    id: Id.value,
    title: title.value,
    description: description.value,
    price: price.value,
    pol: category.value,
    imageUrl: `https://vue-shop-gifts.vercel.app/gifts/gift-${Id.value}.webp`,
    images: {}
  }

  for (let i = 1; i <= countImg.value; i++) {
    item.images[`imageUrl${i}`] =
      `https://vue-shop-gifts.vercel.app/gifts/gift-${Id.value}-${i}.webp`
  }
  isSubmit.value = true
  setTimeout(() => {
    isSubmit.value = false
  }, 3000)

  await axios.post('https://e5e2fa5636b51605.mokky.dev/gifts', item)

  Id.value = Id.value + 1
}

const passwordOk = ref(false)
const password = ref('')
const isAdmin = localStorage.getItem('isAdmin')
if (isAdmin) passwordOk.value = true
watch(password, () => {
  if (password.value == 'bigBalls') {
    passwordOk.value = true
    localStorage.setItem('isAdmin', true)
  }
})
</script>

<template>
  <h1 class="border-b-2 p-2 text-slate-800 border-green-500 text-3xl">Добавить товар</h1>
  <input
    v-if="!passwordOk"
    type="text"
    v-model="password"
    placeholder="Пароль"
    class="mt-1 block w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
  />
  <form @submit.prevent="createProduct" class="grid grid-cols-2" v-show="passwordOk">
    <div>
      <input
        required
        type="number"
        v-model="Id"
        placeholder="ID"
        class="mt-1 block w-14 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />
      <input
        v-model="title"
        placeholder="Название товара"
        type="text"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        required
      />
      <textarea
        required
        v-model="description"
        type="text"
        placeholder="Описание товара"
        class="mt-1 whitespace-pre-wrap block w-full h-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />
    </div>
    <div>
      <input
        required
        v-model="price"
        type="number"
        placeholder="Стоимость"
        class="mt-11 ml-2 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />

      <select
        @change="onChangeSelect"
        name="category"
        class="ml-2 mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      >
        <option value="female">Для неё</option>
        <option value="male">Для него</option>
        <option value="child">Детский</option>
      </select>

      <input
        v-model="countImg"
        type="number"
        placeholder="Количество фотографий в карточке"
        class="mt-1 block w-1/2 px-3 ml-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />
      <button
        v-if="!isSubmit"
        type="submit"
        class="bg-green-800 m-2 text-white text-xl px-6 py-3 rounded-full font-bold hover:opacity-80 focus:ring-teal-300 focus:ring-4 transition-all duration-300"
      >
        Отправить
      </button>
      <button
        v-else
        disabled
        type="submit"
        class="bg-slate-400 m-2 text-white text-xl px-6 py-3 rounded-full font-bold hover:opacity-80 focus:ring-teal-300 focus:ring-4 transition-all duration-300"
      >
        Товар создан
      </button>
    </div>
  </form>
</template>

<style scoped></style>
