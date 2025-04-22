<template>
  <div class="vertical-carousel">
    <el-carousel :height="height" direction="vertical" :autoplay="false">
      <el-carousel-item v-for="item in images" :key="item.id">
        <img :src="item.url" :alt="item.title" class="carousel-image">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    required: true
  },
  height: {
    type: String,
    default: '300px'
  }
})
</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style> 