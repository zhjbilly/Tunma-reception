<template>
  <div class="gradient-banner" >
    <div class="banner-content">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// 定义 props
const props = defineProps({
  title: {
    type: String,
    default: '公告展示'
  },
  description: {
    type: String,
    default: '最新公告信息'
  }
});
</script>

<style scoped>
.gradient-banner {
  background: linear-gradient(90deg, #4c86af, #409EFF); /* 渐变绿色背景 */
  color: white;
  padding: 20px;
  text-align: center;
}

.banner-content h1 {
  margin: 0;
  font-size: 28px;
}

.banner-content p {
  margin: 5px 0 0;
  font-size: 18px;
}
</style>
