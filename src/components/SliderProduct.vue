<template>
  <Carousel :autoplay="6000" :wrap-around="true" :navigationEnabled="true">
    <Slide key="1">
      <div class="carousel__item">
        <img class="transition w-full bg-cover rounded-lg" :src="imageUrl" alt="Slide" />
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
const props = defineProps({
  imageUrl: String
})
</script>
<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

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
.carousel__slide {
  margin-right: 7px;
}
</style>
