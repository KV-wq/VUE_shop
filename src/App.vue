<script setup>
import { computed, onMounted, onUnmounted, provide, ref } from 'vue'
import axios from 'axios'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

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
    storedCarts.push(item) // Добавляем товар в корзину
    localStorage.setItem('carts', JSON.stringify(storedCarts)) // Сохраняем корзину в LocalStorage
    item.cartId = Date.now() // Генерируем уникальный идентификатор для примера
  } else {
    item.isAdded = false
    const index = storedCarts.findIndex((cartItem) => cartItem.id === item.id)
    if (index !== -1) {
      storedCarts.splice(index, 1) // Удаляем товар из корзины
      localStorage.setItem('carts', JSON.stringify(storedCarts)) // Сохраняем обновленную корзину
    }
    item.cartId = null
  }
  fetchCart()
}

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
    console.log(favourites)
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
    carts.value = items.value.filter((item) => item.isAdded)
  } catch (error) {
    alert(error.message) // Обработка ошибок
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

const createOrder = async () => {
  try {
    const { data } = await axios.post('https://e5e2fa5636b51605.mokky.dev/orders', {
      items: carts.value,
      totalPrice: totalPrice.value,
      orderId: Date.now()
    })
    const orderData = {
      items: carts.value,
      totalPrice: totalPrice.value,
      orderId: Date.now()
    }

    // Получаем существующие заказы из LocalStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || []

    // Добавляем новый заказ в массив существующих заказов
    existingOrders.push(orderData)

    // Сохраняем обновленный массив заказов в LocalStorage
    localStorage.setItem('orders', JSON.stringify(existingOrders))
    orderId.value = data.id
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/1')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/2')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/3')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/4')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/5')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/6')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/7')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/8')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/9')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/10')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/11')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/12')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/13')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/14')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/15')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/16')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/17')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/18')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/19')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/20')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/21')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/22')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/23')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/24')
    axios.delete('https://e5e2fa5636b51605.mokky.dev/cart/25')
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
    const { data } = await axios.get('https://e5e2fa5636b51605.mokky.dev/sneakers?sortBy=title')

    items.value = data.map((ob) => ({
      ...ob,
      isFavourite: false,
      isAdded: false
    }))

    fetchFavourites()
    fetchCart()
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

const totalPrice = computed(() => carts.value.reduce((acc, item) => acc + item.price, 0))
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
  <div class="w-4/5 max-[700px]:w-[180vw] mx-auto bg-white rounded-2xl shadow-2xl mt-10 pb-1 mb-12">
    <Header @handle-drawer="handleDrawer" :totalPrice="totalPrice" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
