<script setup>
import { computed, onMounted, onUnmounted, provide, ref } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import Snowflake from './components/Snowflake.vue'

const showButton = ref(false)

const onScroll = () => {
  showButton.value = window.scrollY > 350
  if (window.scrollY > 350) {
    document.querySelector('.scroll-button').classList.add('show')
  } else {
    document.querySelector('.scroll-button').classList.remove('show')
  }
}
const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const items = ref([])
const carts = ref([])

const isLoading = ref(true)
provide('isLoading', isLoading)

// const addToCarts = async (item) => {
//   const obj = {
//     parentId: item.id
//   }
//   if (!item.isAdded) {
//     item.isAdded = true
//     const { data } = await axios.post('https://e5e2fa5636b51605.mokky.dev/cart', obj)
//     carts.value.push(item)

//     item.cartId = data.id
//   } else {
//     item.isAdded = false
//     carts.value.splice(carts.value.indexOf(item), 1)
//     await axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/' + item.cartId)
//     item.cartId = null
//   }
// }
// const addToFavourite = async (item) => {
//   try {
//     const obj = {
//       sneaker_id: item.id
//     }
//     if (!item.isFavourite) {
//       item.isFavourite = true
//       const { data } = await axios.post('https://e5e2fa5636b51605.mokky.dev/favourites', obj)
//       item.favouriteId = data.id
//     } else {
//       item.isFavourite = false
//       await axios.delete('https://e5e2fa5636b51605.mokky.dev/favourites/' + item.favouriteId)
//       item.favouriteId = null
//     }
//   } catch (error) {
//     alert(error.message)
//   }
// }
// const fetchFavourites = async () => {
//   try {
//     const { data: favourites } = await axios.get('https://e5e2fa5636b51605.mokky.dev/favourites')
//     items.value = items.value.map((it) => {
//       const favourite = favourites.find((fav) => fav.sneaker_id === it.id)

//       if (!favourite) return it
//       return { ...it, isFavourite: true, favouriteId: favourite.id }
//     })
//   } catch (error) {
//     alert(error.message)
//   }
// }
// const fetchCart = async () => {
//   try {
//     const { data: cartFetch } = await axios.get('https://e5e2fa5636b51605.mokky.dev/cart')
//     items.value = items.value.map((it) => {
//       const cart = cartFetch.find((fav) => fav.parentId === it.id)
//       if (!cart) return it

//       return { ...it, isAdded: true, cartId: cart.id }
//     })
//     carts.value = items.value.filter((item) => item.isAdded)
//   } catch (error) {
//     alert(error.message)
//   }
// }
const addToCarts = (item) => {
  const obj = {
    parentId: item.id
  }
  // Получаем текущую корзину из LocalStorage
  const storedCarts = JSON.parse(localStorage.getItem('carts')) || []

  if (!item.isAdded) {
    item.isAdded = true
    storedCarts.push(item)
    storedCarts.forEach((a) => (a.count = 1))
    localStorage.setItem('carts', JSON.stringify(storedCarts)) // Сохраняем корзину в LocalStorage
  } else {
    item.isAdded = false
    const index = storedCarts.findIndex((cartItem) => cartItem.id === item.id)
    if (index !== -1) {
      storedCarts.splice(index, 1) // Удаляем товар из корзины
      localStorage.setItem('carts', JSON.stringify(storedCarts)) // Сохраняем обновленную корзину
    }
  }
  fetchCart()
  if (storedCarts.length == 0) carts.value = []
}

const cartCountUp = (item) => {
  const index = carts.value.findIndex((cartItem) => cartItem.id === item.id)
  if (index !== -1) {
    carts.value[index].count += 1
    localStorage.setItem('carts', JSON.stringify(carts.value)) // Сохраняем измененную корзину
  }
}
provide('cartCountUp', cartCountUp)
const cartCountDown = (item) => {
  const index = carts.value.findIndex((cartItem) => cartItem.id === item.id)
  if (index !== -1) {
    carts.value[index].count -= 1
    localStorage.setItem('carts', JSON.stringify(carts.value)) // Сохраняем измененную корзину
  }
}
provide('cartCountDown', cartCountDown)

const addToFavourite = (item) => {
  try {
    const obj = {
      sneaker_id: item.id
    }

    // Получаем текущие избранные товары из LocalStorage
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || []

    if (!item.isFavourite) {
      item.isFavourite = true
      storedFavourites.push(item) // Добавляем товар в избранное
      localStorage.setItem('favourites', JSON.stringify(storedFavourites)) // Сохраняем избранное в LocalStorage
      item.favouriteId = Date.now() // Генерируем уникальный идентификатор для примера
    } else {
      item.isFavourite = false
      const index = storedFavourites.findIndex((favItem) => favItem.id === item.id)
      if (index !== -1) {
        storedFavourites.splice(index, 1) // Удаляем товар из избранного
        localStorage.setItem('favourites', JSON.stringify(storedFavourites)) // Сохраняем обновленное избранное
      }
      item.favouriteId = null
    }
  } catch (error) {
    alert(error.message)
  }
}

const fetchFavourites = () => {
  try {
    // Получаем избранные товары из LocalStorage
    const favourites = JSON.parse(localStorage.getItem('favourites')) || []

    // Обновляем items.value на основе избранных
    items.value = items.value.map((it) => {
      const favourite = favourites.find((fav) => fav.id === it.id)
      if (!favourite) return it // Если товар не в избранном, возвращаем его без изменений
      return { ...it, isFavourite: true, favouriteId: favourite.favouriteId } // Добавляем информацию о избранном
    })
  } catch (error) {
    alert(error.message) // Обработка ошибок
  }
}

const fetchCart = () => {
  try {
    // Получаем корзину из LocalStorage
    const cartFetch = JSON.parse(localStorage.getItem('carts')) || []

    // Обновляем items.value на основе корзины
    items.value = items.value.map((it) => {
      const cart = cartFetch.find((cartItem) => cartItem.id === it.id)
      if (!cart) return it // Если товар не в корзине, возвращаем его без изменений
      return { ...it, isAdded: true, cartId: cart.cartId } // Добавляем информацию о корзине
    })

    // Обновляем carts.value, чтобы содержать только товары, которые добавлены в корзину
    carts.value = JSON.parse(localStorage.getItem('carts'))
  } catch (error) {
    alert(error.message)
  }
}

provide('items', items)
provide('carts', carts)
provide('addToCarts', addToCarts)

provide('fetchCart', fetchCart)
provide('fetchFavourites', fetchFavourites)
const orderIsCreated = ref(false)
provide('orderIsCreated', orderIsCreated)
const orderId = ref(1)
provide('orderId', orderId)

const createOrder = async (Data) => {
  try {
    const { data } = await axios.post('https://e5e2fa5636b51605.mokky.dev/orders', {
      items: carts.value,
      orderId: Data.orderId,
      orderData: Data
    })
    const orderData = {
      items: carts.value,
      totalPrice: totalPrice.value,
      orderId: Data.orderId
    }

    // Получаем существующие заказы из LocalStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || []

    // Добавляем новый заказ в массив существующих заказов
    existingOrders.push(orderData)

    // Сохраняем обновленный массив заказов в LocalStorage
    localStorage.setItem('orders', JSON.stringify(existingOrders))
    orderId.value = data.id

    carts.value.forEach((c) => (c.isAdded = false))
    carts.value = []
    orderIsCreated.value = true
    localStorage.removeItem('carts')
    return data
  } catch (error) {
    orderIsCreated.value = false
    alert(error.message)
  }
}

provide('addToFavourite', addToFavourite)

onMounted(async () => {
  try {
    const { data } = await axios.get('https://e5e2fa5636b51605.mokky.dev/gifts?sortBy=title')

    items.value = data.map((ob) => ({
      ...ob,
      isFavourite: false,
      isAdded: false
    }))

    fetchFavourites()
    fetchCart()
    isLoading.value = false
  } catch (error) {
    alert(error.message)
  }
})

const drawerOpen = ref(false)
function handleDrawer() {
  orderIsCreated.value = false
  drawerOpen.value = !drawerOpen.value
}
provide('drawerOpen', handleDrawer)

const totalPrice = computed(() => {
  // Проверяем, что carts.value существует и является массивом
  if (!carts.value || !Array.isArray(carts.value)) {
    return 0 // Возвращаем 0, если carts.value не существует или не является массивом
  }

  return carts.value.reduce((acc, item) => acc + item.price * item.count, 0)
})
provide('totalPrice', totalPrice)
</script>

<template>
  <Drawer v-if="drawerOpen" @createOrder="createOrder" />

  <button
    @click="scrollTop"
    class="scroll-button fixed bottom-10 right-10 bg-[#39c383] hover:bg-[#2c9665] text-white font-bold py-2 px-4 rounded-full w-14 h-14 transition-transform duration-500 ease-in-out z-10 transition-color"
    v-if="showButton"
  >
    <img src="/arrow-next.svg" class="mx-auto -rotate-90" alt="Up" />
  </button>
  <button
    class="fixed bottom-5 left-5 rounded-full w-12 h-12 transition z-10 transition-color hover:shadow-xl active:scale-90"
  >
    <a href="https://t.me/vue_shop" target="_blank">
      <img src="/telegram.svg" class="mx-auto" alt="Telegram" title="Аккаунт техподдержки"
    /></a>
  </button>
  <Snowflake v-for="n in 200" :key="n" class="-z-10" />
  <div
    class="mops w-4/5 max-[900px]:w-[100vw] max-[700px]:m-0 mx-auto bg-white rounded-2xl shadow-2xl mt-10 pb-1 mb-12 max-[900px]:mt-3 max-[900px]:mb-5"
  >
    <Header
      @handle-drawer="handleDrawer"
      :totalPrice="totalPrice"
      class="hover:shadow-md max-[800px]:hover:shadow-none max-[800px]:active:shadow-md transition-all"
    />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.mops {
  @media (max-width: 700px) {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
</style>
