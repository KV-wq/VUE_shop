<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemsList from './CartItemsList.vue'
import Info2 from './Info2.vue'
import Info from './Info.vue'
import { inject, provide, ref } from 'vue'
import axios from 'axios'

const exit = inject('drawerOpen')
const totalPrice = inject('totalPrice')
const emit = defineEmits('createOrder')
const orderIsCreated = inject('orderIsCreated')
const orderId = inject('orderId')

const creating = ref(false)
const adressing = ref(false)

const deliveryPrice = ref(0)

const name = ref('')
const secondName = ref('')
const email = ref('')
const phone = ref('')
const index = ref('')
const adress = ref('')
const deliveryMethod = ref('')

const submitOrder = () => {
  const Data = {
    promo: promo.value,
    name: name.value,
    secondName: secondName.value,
    email: email.value,
    phone: phone.value,
    index: index.value,
    adress: adress.value,
    deliveryMethod: deliveryMethod.value,
    orderId: Date.now(),
    price:
      totalPrice.value - Math.round((totalPrice.value * sale.value) / 100) + deliveryPrice.value
  }

  // Эмитируем событие с данными заказа
  emit('createOrder', Data)
}

const promo = ref('')
const sale = ref(0)
provide('sale', sale)

const checkPromo = () => {
  if (promo.value == 'chillyWind') sale.value = 10
}

const updateTotalPrice = () => {
  if (deliveryMethod.value == 'courier') {
    deliveryPrice.value = 500
  } else if (deliveryMethod.value == 'country') {
    deliveryPrice.value = 350
  } else if (deliveryMethod.value == 'countryPlus') {
    deliveryPrice.value = 700
  } else {
    deliveryPrice.value = 0
  }
}

const apiKey = '7fe01f48-68de-4e2e-a870-b015a9c5a716' // Ваш API ключ
const suggestions = ref([])

const fetchSuggestions = async () => {
  if (adress.value.length < 3) {
    suggestions.value = []
    return
  }

  try {
    const response = await axios.get('https://suggest-maps.yandex.ru/v1/suggest', {
      params: {
        apikey: apiKey,
        text: adress.value,
        lang: 'ru_RU', // Язык
        results: 5 // Количество результатов
      }
    })

    // Проверка наличия данных в ответе
    if (response.data && response.data.results) {
      suggestions.value = response.data.results.map((result) => ({
        title: result.title,
        subtitle: result.subtitle,
        formatted_address: result.formatted_address,
        distance: result.distance ? `${result.distance.value} м` : null
      }))
    } else {
      console.error('Ответ от API не содержит ожидаемых данных:', response.data)
      suggestions.value = []
    }
  } catch (error) {
    console.error('Ошибка при получении подсказок:', error)
    suggestions.value = []
  }
}

const selectSuggestion = (suggestion) => {
  if (suggestion.subtitle) adress.value = suggestion.subtitle.text + ', ' + suggestion.title.text
  else adress.value = suggestion.title.text

  suggestions.value = []
}
</script>

<template>
  <div v-if="creating" class="fixed left-0 bottom-0 top-0 h-full w-full bg-black/70 z-10" />
  <div
    v-else-if="!creating"
    class="fixed left-0 bottom-0 top-0 h-full w-full bg-black/70 z-10"
    @click="exit"
  />

  <div
    class="fixed bg-white h-full min-[1100px]:w-1/4 w-1/2 s z-20 right-0 top-0 p-7"
    v-if="creating"
  >
    <form v-if="!adressing" @submit.prevent="() => (adressing = true)">
      <h2 class="text-2xl font-bold text-start mb-3">Контактная информация</h2>
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Имя</label>
        <input
          v-model="name"
          type="text"
          id="name"
          name="name"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Ваше имя"
        />
      </div>
      <div class="mb-4">
        <label for="secondName" class="block text-sm font-medium text-gray-700">Фамилия</label>
        <input
          v-model="secondName"
          type="text"
          id="secondName"
          name="secondName"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Ваша фамилия"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Электронная почта</label>
        <input
          v-model="email"
          type="email"
          id="email"
          name="email"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Ваш email"
        />
      </div>
      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-700">Номер телефона</label>
        <input
          v-model="phone"
          type="phone"
          id="phone"
          name="phone"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Ваш номер телефона"
        />
      </div>
      <button
        type="submit"
        class="text-white bg-[#67ed86] w-full rounded-xl py-3 text-lg transition-all disabled:bg-slate-400 hover:bg-[#57e874] active:scale-95 disabled:pointer-events-none"
      >
        Далее
      </button>
    </form>
    <form v-else-if="adressing" @submit.prevent="submitOrder">
      <h2 class="text-2xl font-bold text-start mb-3">Доставка</h2>
      <div class="mb-4">
        <label for="delivery-method" class="block text-sm font-medium text-gray-700"
          >Способ доставки</label
        >
        <select
          @change="updateTotalPrice"
          v-model="deliveryMethod"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md p-2"
        >
          <option value="" disabled selected>Выберите способ доставки</option>
          <option value="pickup">Самовывоз</option>
          <option value="courier">Курьерская служба (+500₽)</option>
          <option value="country">Почта России (+350₽)</option>
          <option value="countryPlus">Почта России Первый Класс (+700₽)</option>
        </select>
      </div>
      <div v-if="deliveryMethod == 'courier'" class="mb-4">
        <label for="address" class="block text-sm font-medium text-gray-700"
          >Адрес доставки (только Новосибирск)</label
        >
        <input
          required
          type="text"
          v-model="adress"
          class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Введите адрес"
          @input="fetchSuggestions"
        />
        <ul v-if="suggestions.length" class="">
          <li
            class="border-b border-slate-500 p-0"
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @click="selectSuggestion(suggestion)"
          >
            <span v-if="suggestion.subtitle">{{ suggestion.subtitle.text }}, </span>
            {{ suggestion.title.text }},
          </li>
        </ul>
      </div>
      <div v-if="deliveryMethod == 'pickup'" class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Пункт самовывоза</label>
        <span type="text" class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >Новосибирск, Богдана-Хмельницкого, 7</span
        >
      </div>
      <div v-if="deliveryMethod == 'country'" class="mb-4">
        <div class="mb-4">
          <label for="index" class="block text-sm font-medium text-gray-700">Почтовый идекс </label>
          <input
            required
            type="text"
            v-model="index"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Введите адрес"
          />
        </div>
        <label for="address" class="block text-sm font-medium text-gray-700">Адрес доставки</label>
        <input
          @input="fetchSuggestions"
          required
          type="text"
          v-model="adress"
          class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Введите адрес"
        />
        <ul v-if="suggestions.length" class="">
          <li
            class="border-b border-slate-500 p-0"
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @click="selectSuggestion(suggestion)"
          >
            <span v-if="suggestion.subtitle">{{ suggestion.subtitle.text }}, </span>
            {{ suggestion.title.text }},
          </li>
        </ul>
      </div>
      <div v-if="deliveryMethod == 'countryPlus'" class="mb-4">
        <div class="mb-4">
          <label for="index" class="block text-sm font-medium text-gray-700">Почтовый идекс </label>
          <input
            required
            type="text"
            v-model="index"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Введите адрес"
          />
        </div>
        <label for="address" class="block text-sm font-medium text-gray-700">Адрес доставки</label>
        <input
          @input="fetchSuggestions"
          required
          type="text"
          v-model="adress"
          class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Введите адрес"
        />
        <ul v-if="suggestions.length" class="">
          <li
            class="border-b border-slate-500 p-0"
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @click="selectSuggestion(suggestion)"
          >
            <span v-if="suggestion.subtitle">{{ suggestion.subtitle.text }}, </span>
            {{ suggestion.title.text }},
          </li>
        </ul>
      </div>

      <button
        type="submit"
        class="text-white bg-[#67ed86] w-full rounded-xl py-3 text-lg transition-all disabled:bg-slate-400 hover:bg-[#57e874] active:scale-95 disabled:pointer-events-none"
      >
        Создать заказ
      </button>
    </form>

    <div class="flex flex-col gap-4 absolute bottom-5 w-5/6 ml-1 bg-white z-10">
      <div>
        <div class="h-10 bg-white blur-lg"></div>
        <div v-if="sale == 0" class="relative">
          <input
            v-model="promo"
            type="text"
            placeholder="Введите промокод (при наличии)"
            class="text-slate-700 w-full border-b-2 border-dashed pb-2 hover:outline-none outline-none"
          />
          <img
            @click="checkPromo"
            src="/promo.svg"
            alt="promocode"
            class="absolute w-7 right-1 top-0 cursor-pointer active:scale-110 active:rotate-[20deg] transition-all"
          />
        </div>
        <div class="flex gap" v-if="sale !== 0">
          <span>Скидка:</span>
          <div class="flex-1 border-b-2 border-dashed"></div>
          <b class="text-slate-800"> {{ Math.round((totalPrice * sale) / 100) }} ₽</b>
        </div>
      </div>
      <div class="flex gap-1">
        <span>Итого:</span>
        <div class="flex-1 border-b-2 border-dashed"></div>
        <b>{{ totalPrice - Math.round((totalPrice * sale) / 100) + deliveryPrice }} ₽</b>
      </div>
      <button
        @click="() => (creating = false)"
        type="submit"
        class="text-white bg-[#e8597b] w-full rounded-xl py-3 text-lg transition-all disabled:bg-slate-400 hover:bg-[#d24a58] active:scale-95 disabled:pointer-events-none"
      >
        Вернуться назад
      </button>
    </div>
    <div class="absolute bg-white w-full h-36 bottom-0"></div>
  </div>

  <!---------------------------------------------------------------------------->

  <div
    class="fixed bg-white h-full min-[1100px]:w-1/4 w-1/2 s z-20 right-0 top-0 p-7"
    v-else-if="!creating"
  >
    <DrawerHead />
    <info2
      class="z-30"
      title="Заказ оформлен!"
      :description="`Ваш заказ #${Date.now()} успешно получен и скоро будет передан в службу доставки`"
      img="/order-success-icon.png"
      v-if="orderIsCreated"
    />

    <info
      title="Корзина пустая 🙁"
      description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ "
      img="/package-icon.png"
      v-else-if="totalPrice == 0"
    />

    <div class="overflow-auto max-h-[100%] mx-auto">
      <CartItemsList />
    </div>

    <div
      class="flex flex-col gap-4 absolute bottom-5 w-5/6 ml-1 bg-white z-10"
      v-if="totalPrice !== 0"
    >
      <div>
        <div class="h-10 bg-white blur-lg"></div>
        <div v-if="sale == 0" class="relative">
          <input
            v-model="promo"
            type="text"
            placeholder="Введите промокод (при наличии)"
            class="text-slate-700 w-full border-b-2 border-dashed pb-2 hover:outline-none outline-none"
          />
          <img
            @click="checkPromo"
            src="/promo.svg"
            alt="promocode"
            class="absolute w-7 right-1 top-0 cursor-pointer active:scale-110 active:rotate-[20deg] transition-all"
          />
        </div>
        <div class="flex gap" v-if="sale !== 0">
          <span>Скидка:</span>
          <div class="flex-1 border-b-2 border-dashed"></div>
          <b class="text-slate-800"> {{ Math.round((totalPrice * sale) / 100) }} ₽</b>
        </div>
      </div>
      <div class="flex gap-1">
        <span>Итого:</span>
        <div class="flex-1 border-b-2 border-dashed"></div>
        <b>{{ totalPrice - Math.round((totalPrice * sale) / 100) }} ₽</b>
      </div>
      <button
        @click="() => (creating = true)"
        :disabled="totalPrice === 0"
        type="submit"
        class="text-white bg-[#1cff7f] w-full rounded-xl py-3 text-lg transition-all disabled:bg-slate-400 hover:bg-[#2dab63] active:scale-95 disabled:pointer-events-none"
      >
        Перейти к оформлению
      </button>
    </div>
    <div class="absolute bg-white w-full h-36 bottom-0"></div>
  </div>
</template>
