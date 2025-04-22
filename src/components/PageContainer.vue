<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="max-w-6xl mx-auto px-8 sm:px-16 lg:px-32 py-8">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
/* 基础样式 */
.max-w-6xl {
  max-width: 1152px; /* 适中的内容区域 */
}

/* 增加移动端的边距 */
@media (max-width: 640px) {
  .px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* 平板的边距 */
@media (min-width: 641px) and (max-width: 1024px) {
  .sm\:px-16 {
    padding-left: 4rem;
    padding-right: 4rem;
  }
}

/* 桌面端的边距 */
@media (min-width: 1025px) {
  .lg\:px-32 {
    padding-left: 8rem;  /* 显著增加桌面端的左右边距 */
    padding-right: 8rem;
  }
}
</style> 