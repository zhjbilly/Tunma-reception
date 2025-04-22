<template>
  <div class="thumbnail-carousel">
    <el-carousel :height="height" :autoplay="false" ref="mainCarousel">
      <el-carousel-item v-for="item in images" :key="item.id">
        <img :src="item.url" :alt="item.title" class="carousel-image">
      </el-carousel-item>
    </el-carousel>
    <div class="thumbnails">
      <div
        v-for="(item, index) in images"
        :key="item.id"
        class="thumbnail"
        :class="{ active: currentIndex === index }"
        @click="setActiveItem(index)"
      >
        <img :src="item.url" :alt="item.title">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  height: {
    type: String,
    default: '300px'
  }
})

const mainCarousel = ref(null)
const currentIndex = ref(0)

const setActiveItem = (index) => {
  mainCarousel.value.setActiveItem(index)
  currentIndex.value = index
}
</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnails {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.thumbnail {
  width: 60px;
  height: 60px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.thumbnail.active {
  opacity: 1;
  border: 2px solid #409EFF;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
