<template>
  <div class="detail-page">
    <h1 class="title">{{ title }}</h1>
    <div class="meta-info">
      <span class="publish-date">发布时间: {{ publishDate }}</span>
<!--      <span class="views">浏览量: {{ views }}</span>-->
    </div>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: 'GonggaoInfo',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    publishDate: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.detail-page {
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
}

.meta-info {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  text-align: right;
}

.meta-info span {
  margin-right: 10px;
}

.content {
  font-size: 16px;
  line-height: 1.6;
}
</style>
