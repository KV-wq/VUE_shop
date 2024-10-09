<script setup>
const emit = defineEmits('handleDrawer')
defineProps({
  totalPrice: Number
})
</script>
<template>
  <header class="flex justify-between border-b border-slate-400 px-8 py-6">
    <div class="flex items-center gap-4">
      <router-link to="/"
        ><img
          src="/sneakers.png"
          alt="Logo"
          class="w-[55px] hover:scale-110 hover:rotate-12 cursor-pointer transition drop-shadow-md"
      /></router-link>
      <div>
        <h1 class="text-xl font-bold">Sneakers Shop</h1>
        <p class="text-slate-500">The best shoes in NSK</p>
      </div>
    </div>
    <ul class="flex gap-12 items-center">
      <li
        class="flex gap-2 cursor-pointer text-slate-700 hover:text-slate-950 hover:scale-105 transition-all"
        @click="() => emit('handleDrawer')"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice - Math.round((totalPrice * 7) / 100) }} руб.</b>
      </li>
      <router-link to="favorites"
        ><li
          class="flex gap-2 cursor-pointer text-slate-700 hover:text-slate-950 hover:scale-105 transition-all"
        >
          <img src="/heart.svg" alt="Cart" />
          <span class="font-medium">Закладки</span>
        </li></router-link
      >
      <router-link to="/profile"
        ><li
          class="flex gap-2 cursor-pointer text-slate-700 hover:text-slate-950 hover:scale-105 transition-all"
        >
          <img src="/profile.svg" alt="Cart" />
          <span class="font-medium">Заказы</span>
        </li></router-link
      >
    </ul>
  </header>
</template>
