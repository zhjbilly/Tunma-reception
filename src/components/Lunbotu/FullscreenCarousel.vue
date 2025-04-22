<template>
  <div class="fullscreen-carousel">
    <el-carousel :height="height" :interval="5000">
      <el-carousel-item v-for="item in images" :key="item.id">
        <div class="fullscreen-item">
          <img :src="item.url" :alt="item.title" class="carousel-image">
          <div class="overlay">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </div>
        </div>
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
    default: '100vh'
  }
})
</script>

<style scoped>
.fullscreen-item {
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
}

.overlay h2 {
  margin: 0 0 10px 0;
}

.overlay p {
  margin: 0;
}
</style> 