<template>
  <div class="card-carousel">
    <el-carousel 
      :interval="interval"
      :autoplay="autoplay"
      :trigger="trigger"
      :arrow="arrow"
      type="card"
      :height="height"
      :initial-index="1"
      indicator-position="outside"
    >
      <el-carousel-item v-for="item in images" :key="item.id">
        <div class="card-item">
          <img :src="item.url" :alt="item.title" class="carousel-image">
          <div class="card-content">
            <h3>{{ item.title }}</h3>
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
    default: '400px'
  },
  interval: {
    type: Number,
    default: 4000
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String,
    default: 'hover'
  },
  arrow: {
    type: String,
    default: 'always'
  }
})
</script>

<style scoped>
.card-carousel {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.card-item {
  position: relative;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
}

.card-item:hover {
  transform: translateY(-5px);
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
}

.card-content h3 {
  margin: 0 0 10px 0;
}

.card-content p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

:deep(.el-carousel__mask) {
  opacity: 0.5;
}

:deep(.el-carousel__item--card) {
  width: 50%;
}
</style> 