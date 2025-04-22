<template>

  <div class="card-grid">
    <div
        v-for="item in items"
        :key="item.id"
        class="card-item"
        @click="handleClick(item)"
    >
      <img :src="item.image" class="card-image" alt="项目图片">
      <div class="card-body">
        <h3 class="card-title">{{ item.name }}</h3>
        <p class="card-desc">{{ item.description }}</p>
        <div class="card-meta">
          <span class="category-tag">{{ item.category }}</span>
          <span class="date-text">{{ formatDate(item.date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

// 定义 props
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

// 格式化日期的方法
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
const router = useRouter();
const handleClick = (item) => {
  // 点击卡片时跳转到指定页面
  router.push({ path: `/${item.nameinfo}/detail/${item.id}` });
};
</script>


<style scoped>
.card-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.card-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  overflow: hidden;
}

.card-item:hover {
  transform: translateY(-3px);
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

.card-title {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.card-desc {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-tag {
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.date-text {
  color: #888;
  font-size: 0.8rem;
}
</style>
