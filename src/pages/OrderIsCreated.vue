<script lang="ts" setup>
import Loading from '@/components/Loading.vue'
</script>

<template>
  <Loading v-if="false" />
  <div
    class="w-full h-[60vh] max-[600px]:h-[75vh] flex items-center text-center flex-col select-none"
  >
    <img src="/order-success-icon.png" alt="success" class="mt-10" />
    <p class="text-3xl font-bold text-slate-800 mt-7 mb-1">Ваш заказ успешно создан!</p>
    <p class="text-md text-slate-600">Мы свяжемся с вами в течение 24 часов.</p>
  </div>
</template>

<style scoped></style>
