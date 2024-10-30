<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits()

const snowflakeStyle = ref({
  position: 'absolute',
  top: '-10px',
  left: `${Math.random() * 98}vw`,
  opacity: Math.random(),
  animationDuration: `${Math.random() * 2 + 30}s`,
  animationDelay: `${Math.random() * 30}s`
})
</script>

<template>
  <div class="snowflake" :style="snowflakeStyle"></div>
</template>

<style scoped>
.snowflake {
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  animation: infinite;
  animation-name: fall;
  animation-timing-function: linear;
}

@keyframes fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  30% {
    transform: translateY(100vh);
    opacity: 0;
  }
  60% {
    transform: translateY(0);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
