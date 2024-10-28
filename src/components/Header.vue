<script setup>
const emit = defineEmits('handleDrawer')
defineProps({
  totalPrice: Number
})
</script>
<template>
  <header class="flex justify-between border-b border-slate-400 px-8 py-6">
    <div class="flex items-center gap-4 logo">
      <router-link to="/"
        ><img
          src="/sneakers.png"
          alt="Logo"
          class="w-[55px] cursor-pointer transition drop-shadow-md"
      /></router-link>
      <router-link to="/">
        <div>
          <h1 class="text-xl font-bold">Sneakers Shop</h1>
          <p class="text-slate-500">The best shoes in NSK</p>
        </div></router-link
      >
    </div>
    <ul class="flex gap-12 max-[900px]:gap-6 items-center">
      <li
        class="flex gap-2 cursor-pointer text-slate-700 hover:text-slate-950 hover:scale-105 transition-all max-[800px]:ml-3 text-center"
        @click="() => emit('handleDrawer')"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
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
<style scoped>
.logo:hover img {
  transform: scale(1.1) rotate(12deg);
}
</style>
