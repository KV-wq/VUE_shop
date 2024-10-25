<template>
  <Carousel :autoplay="4000" :wrap-around="true">
    <Slide key="1">
      <div class="carousel__item">
        <img
          class="h-64 max-[1200px]:h-[12rem] min-[2000px]:h-[24rem] transition w-full bg-cover rounded-lg"
          src="/slide-6.webp"
          alt="Slide"
        />
      </div>
    </Slide>
    <Slide key="2"
      ><div class="carousel__item">
        <img
          class="h-64 max-[1200px]:h-[12rem] min-[2000px]:h-[24rem] transition w-full bg-cover rounded-lg"
          src="/slide-2.png"
          alt="Slide"
        /></div
    ></Slide>
    <Slide key="3"
      ><div class="carousel__item">
        <img
          class="h-64 max-[1200px]:h-[12rem] min-[2000px]:h-[24rem] transition w-full bg-cover rounded-lg"
          src="/slide-3.png"
          alt="Slide"
        /></div
    ></Slide>

    <Slide key="5"
      ><div class="carousel__item">
        <img
          class="h-64 max-[1200px]:h-[12rem] min-[2000px]:h-[24rem] transition w-full bg-cover rounded-lg"
          src="/slide-5.jpg"
          alt="Slide"
        /></div
    ></Slide>
    <Slide key="6"
      ><div class="carousel__item">
        <img
          class="h-64 max-[1200px]:h-[12rem] min-[2000px]:h-[24rem] transition w-full bg-cover rounded-lg"
          src="/slide-1.png"
          alt="Slide"
        /></div
    ></Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

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
  width: 100%;
  font-size: 20px;
  border-radius: 20px;
}

.carousel__slide {
  margin: 0px;
  @media (max-width: 1500px) {
    margin: 0;
  }
}
</style>
