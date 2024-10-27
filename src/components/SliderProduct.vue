<template>
  <Loading
    v-if="isLoading"
    class="min-[1900px]:w-[27rem] min-[1900px]:max-h-[25rem] h-[10rem] bg-gray items-center"
  />
  <Carousel :autoplay="6000" :navigationEnabled="true" v-show="!isLoading">
    <Slide key="1">
      <div class="carousel__item">
        <img
          class="transition w-full bg-cover rounded-lg"
          :src="imageUrl"
          alt="Slide"
          @load="handleImageLoad"
        />
      </div>
    </Slide>

    <Slide key="2"
      ><div class="carousel__item">
        <img class="transition w-full bg-cover rounded-lg" :src="imageUrl" alt="Slide" /></div
    ></Slide>

    <Slide key="3"
      ><div class="carousel__item">
        <img class="transition w-full bg-cover rounded-lg" :src="imageUrl" alt="Slide" /></div
    ></Slide>

    <Slide key="4"
      ><div class="carousel__item">
        <img class="transition w-full bg-cover rounded-lg" :src="imageUrl" alt="Slide" /></div
    ></Slide>

    <template #addons>
      <Navigation />
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
  imageUrl: String
})
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
.carousel__item {
  width: 90%;
  font-size: 20px;
  border-radius: 20px;
}
/* .carousel__slide {
  margin-right: 7px;
} */
</style>
