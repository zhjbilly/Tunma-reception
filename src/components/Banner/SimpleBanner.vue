<template>
  <div class="simple-banner">
    <div class="banner-content">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleBanner',
  props: {
    title: {
      type: String,
      default: '公告展示'
    },
    description: {
      type: String,
      default: '欢迎访问失物招领平台'
    }
  }
}
</script>

<style scoped>
.simple-banner {
  background-color: #4CAF50; /* 绿色背景 */
  color: white;
  padding: 20px;
  text-align: center;
}

.banner-content h1 {
  margin: 0;
  font-size: 24px;
}

.banner-content p {
  margin: 5px 0 0;
  font-size: 16px;
}
</style>
