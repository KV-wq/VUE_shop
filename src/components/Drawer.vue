<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemsList from './CartItemsList.vue'
import Info2 from './Info2.vue'
import Info from './Info.vue'
import { inject } from 'vue'
const exit = inject('drawerOpen')
const totalPrice = inject('totalPrice')
const emit = defineEmits('createOrder')
const orderIsCreated = inject('orderIsCreated')
const orderId = inject('orderId')
</script>

<template>
  <div class="fixed left-0 bottom-0 top-0 h-full w-full bg-black/70 z-10" @click="exit" />
  <div class="fixed bg-white h-full min-[1100px]:w-1/4 w-1/2 s z-20 right-0 top-0 p-7">
    <DrawerHead />
    <info2
      title="Заказ оформлен!"
      :description="`Ваш заказ #${orderId} успешно получен и скоро будет передан в службу доставки`"
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
        <div class="flex gap">
          <span>Скидка:</span>
          <div class="flex-1 border-b-2 border-dashed"></div>
          <b class="text-slate-800"> {{ Math.round((totalPrice * 7) / 100) }} ₽</b>
        </div>
      </div>
      <div class="flex gap-1">
        <span>Итого:</span>
        <div class="flex-1 border-b-2 border-dashed"></div>
        <b>{{ totalPrice - Math.round((totalPrice * 7) / 100) }} ₽</b>
      </div>
      <button
        @click="emit('createOrder')"
        :disabled="totalPrice === 0"
        type="submit"
        class="text-white bg-[#1cff7f] w-full rounded-xl py-3 text-lg transition-all disabled:bg-slate-400 hover:bg-[#2dab63] active:scale-95 disabled:pointer-events-none"
      >
        Оформить заказ
      </button>
    </div>
    <div class="absolute bg-white w-full h-36 bottom-0"></div>
  </div>
</template>
