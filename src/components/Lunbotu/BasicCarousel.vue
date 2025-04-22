<template>
  <div class="basic-carousel">
    <el-carousel 
      :height="height"
      :interval="interval"
      :autoplay="autoplay"
      :trigger="trigger"
      :arrow="arrow"
      indicator-position="outside"
    >
      <el-carousel-item v-for="item in images" :key="item.id">
        <img :src="item.url" :alt="item.title" class="carousel-image">
        <div class="carousel-caption">
          <h3>{{ item.title }}</h3>
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
    default: '500px'
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
    default: 'hover'
  }
})
</script>

<style scoped>
.basic-carousel {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-caption {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  padding: 10px 20px;
  border-radius: 4px;
  color: white;
}

:deep(.el-carousel__arrow) {
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 20px;
  width: 50px;
  height: 50px;
}

:deep(.el-carousel__indicators) {
  bottom: 20px;
}
</style> 