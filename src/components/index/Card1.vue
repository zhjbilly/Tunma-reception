<template>
  <div class="list-4">
    <!-- 第一行商品 -->
    <div class="list-4-body">
      <div
          v-for="(item, index) in firstRowItems"
          :key="index"
          class="list-4-item"
          :style="{ width: item.width, height: item.height }"
          @click="handleItemClick(item.link)"
      >
        <img :src="item.image" :alt="item.title" />
        <div class="list-4-item-center">
          <div class="list-4-item-title">{{ item.title }}</div>
        </div>
      </div>
    </div>

    <!-- 第二行商品 -->
    <div class="list-4-body">
      <div
          v-for="(item, index) in secondRowItems"
          :key="index"
          class="list-4-item"
          :style="{ width: item.width, height: item.height }"
          @click="handleItemClick(item.link)"
      >
        <img :src="item.image" :alt="item.title" />
        <div class="list-4-item-center">
          <div class="list-4-item-title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// 定义 props
const props = defineProps({
  firstRowItems: {
    type: Array,
    required: true,
  },
  secondRowItems: {
    type: Array,
    required: true,
  },
});

// 处理点击事件
const handleItemClick = (link) => {
  window.location.href = link; // 跳转到指定链接
};
</script>

<style scoped>
.list-4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* 父容器宽度为 100% */
}

.list-4-body {
  display: flex;
  flex-direction: row;
  width: 100%; /* 每行宽度为 100% */
  margin-bottom: 20px; /* 行间距 */
}

.list-4-item {
  padding: 0;
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 6px;
  margin-right: 2%; /* 商品间距 */
  background-color: #ccc;
  border-radius: 0;
  border: 0;
  cursor: pointer; /* 鼠标悬停时显示为手型 */
  overflow: hidden; /* 防止图片溢出 */
  position: relative; /* 相对定位 */
}

.list-4-item:last-child {
  margin-right: 0; /* 最后一个商品不需要右边距 */
}

.list-4-item img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 图片按比例缩放并填充容器 */
}

.list-4-item-center {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
}

.list-4-item-title {
  padding: 0 6px;
  color: #fff;
  line-height: 44px;
  font-size: 16px;
}
</style>
