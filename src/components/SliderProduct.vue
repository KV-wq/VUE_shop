<template>
  <Loading
    v-if="isLoading"
    class="min-[1900px]:w-[27rem] min-[1900px]:max-h-[25rem] h-[10rem] bg-gray items-center"
  />
  <Carousel :autoplay="6000" :navigationEnabled="true" v-show="!isLoading">
    <Slide v-for="(image, i) in images" :key="i">
      <img
        :src="image"
        alt="Slide"
        @load="handleImageLoad"
        class="w-[85%] max-[800px]:w-[100%] rounded-xl"
        @click="toggleSlide()"
      />
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>
<script setup>
const isLoading = ref(true)
const handleImageLoad = () => {
  isLoading.value = false
}
const props = defineProps({
  images: Object
})
const open = ref(false)
const toggleSlide = () => {
  open.value = !open.value
}
</script>
<script>
import { defineComponent, ref } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
import Loading from './Loading.vue'

export default defineComponent({
  name: 'Autoplay',
  components: {
    Carousel,
    Slide,
    Pagination
  }
})
</script>

<style scoped>
.carousel__slide {
  filter: drop-shadow(0px 10px 10px #1dc5657d);

  margin-left: 11px;
  @media (max-width: 800px) {
    margin-left: 0px; /*17.5px */
    filter: none;
  }
  @media (min-width: 2200px) {
    margin-right: -10px;
  }
}
</style>
