<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const carts = inject('carts')
const remove = inject('addToCarts')

const cartCountUp = inject('cartCountUp')
const cartCountDown = inject('cartCountDown')
</script>

<template>
  <div class="max-h-[65vh] overflow-auto">
    <CartItem
      v-for="cart in carts"
      :key="cart.id"
      :img="cart.imageUrl"
      :title="cart.title"
      :price="cart.price"
      :id="cart.id"
      :onClickRemove="() => remove(cart)"
      :count="cart.count"
      :cartCountUp="() => cartCountUp(cart)"
      :cartCountDown="() => cartCountDown(cart)"
    />
  </div>
</template>
