<template>
  <Carousel :autoplay="4000" :wrap-around="true">
    <Slide key="1">
      <div class="carousel__item">
        <img
          class="h-64 max-[1200px]:h-[12rem] min-[2000px]:h-[24rem] transition w-full bg-cover rounded-lg"
          src="/slides/slide-1.jpeg"
          alt="Slide"
        />
      </div>
    </Slide>

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
  margin-left: 11px;
  @media (max-width: 700px) {
    margin-left: 0px;
  }
  @media (min-width: 2200px) {
    margin-right: -8px;
  }
}
</style>
