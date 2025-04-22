<template>
  <div class="announcement-list">
    <div class="cards-container">
      <div v-for="(item, index) in announcements" :key="index" class="card" @click="goToDetail(item.id)">
        <div class="card-image-container" >
          <img :src="`${baseUrl}`+item.tupian" alt="公告图片" class="card-image" />
        </div>
        <div class="card-content">
          <h3 class="card-title">{{ item.biaoti }}</h3>
          <p class="card-details" v-html="item.xiangqing"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const baseUrl = import.meta.env.VITE_APP_BASE_API;
const router = useRouter();

// 定义 props
const props = defineProps({
  announcements: {
    type: Array, // 公告数据是一个数组
    required: true, // 必传参数
    default: () => [] // 默认值为空数组
  }
});

// 路由跳转方法
const goToDetail = (id) => {
  router.push({ name: 'gonggaodetail', params: { id } });
};
</script>

<style scoped>
.announcement-list {
  max-width: 100%;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* 卡片之间的间距 */
}

.card {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  width: calc(100% - 8px); /* 一行两个卡片 */
}

.card-image-container {
  flex: 1; /* 图片占 1 份 */
  max-width: 200px; /* 图片最大宽度 */
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 图片适应容器 */
}

.card-content {
  flex: 2; /* 内容占 2 份 */
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.card-details {
  margin: 0;
  font-size: 14px;
  color: #666;
}
</style>
