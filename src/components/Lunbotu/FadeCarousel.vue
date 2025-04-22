<template>
  <div class="fade-carousel">
    <el-carousel 
      :height="height"
      :interval="interval"
      :autoplay="autoplay"
      :trigger="trigger"
      :arrow="arrow"
      indicator-position="outside"
    >
      <el-carousel-item v-for="item in images" :key="item.id">
        <div class="fade-item">
          <img :src="item.url" :alt="item.title" class="carousel-image">
          <div class="content-wrapper">
            <div class="caption">
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
              <el-button type="primary" size="large">了解更多</el-button>
            </div>
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
    default: '600px'
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
.fade-carousel {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.fade-item {
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
}

.content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.caption {
  text-align: center;
  color: white;
  padding: 40px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  backdrop-filter: blur(5px);
  max-width: 600px;
}

.caption h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.caption p {
  font-size: 1.2em;
  margin-bottom: 30px;
  line-height: 1.6;
}

:deep(.el-carousel__indicators) {
  bottom: -30px;
}

:deep(.el-carousel__indicator) {
  padding: 12px 4px;
}

:deep(.el-carousel__button) {
  width: 30px;
  height: 3px;
  background-color: #409EFF;
}
</style> 