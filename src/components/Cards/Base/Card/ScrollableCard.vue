<!--  滚动卡片-->
<template>
  <div class="scrollable-cards-container">
    <div class="cards-wrapper">
      <div
          v-for="(item, index) in items"
          :key="index"
          class="card"
          @click="handleClick(item)"
      >
        <img :src="item.image" :alt="item.title" class="card-image" />
        <div class="card-title">{{ item.title }}</div>
      </div>
      <!-- 重复卡片内容以实现无缝滚动 -->
      <div
          v-for="(item, index) in items"
          :key="index + items.length"
          class="card"
          @click="handleClick(item)"
      >
        <img :src="item.image" :alt="item.title" class="card-image" />
        <div class="card-title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
});

const router = useRouter();

const handleClick = (item) => {
  // 点击卡片时跳转到指定页面
  router.push({ path: `/gonggao/detail/${item.id}` });
};
</script>

<style scoped>
.scrollable-cards-container {
  width: 100%; /* 确保容器宽度占满父容器 */
  overflow: hidden; /* 隐藏溢出内容 */
  position: relative; /* 相对定位 */
}

.cards-wrapper {
  display: flex;
  gap: 16px; /* 卡片间距 */
  padding: 16px; /* 容器内边距 */
  white-space: nowrap; /* 防止卡片换行 */
  animation: scroll 20s linear infinite; /* 滚动动画 */
}

@keyframes scroll {
  0% {
    transform: translateX(0); /* 初始位置：第一个卡片在最右侧 */
  }
  100% {
    transform: translateX(-50%); /* 结束位置：滚动到卡片列表的一半 */
  }
}

.card {
  flex: 0 0 auto; /* 禁止卡片伸缩 */
  width: 200px; /* 卡片宽度 */
  border: 1px solid #e0e0e0; /* 边框 */
  border-radius: 8px; /* 圆角 */
  overflow: hidden; /* 隐藏溢出内容 */
  cursor: pointer; /* 鼠标悬停样式 */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* 动画效果 */
}

.card:hover {
  transform: translateY(-4px); /* 悬停时上移 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.card-image {
  width: 100%;
  height: 120px; /* 图片高度 */
  object-fit: cover; /* 图片填充方式 */
}

.card-title {
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
</style>
