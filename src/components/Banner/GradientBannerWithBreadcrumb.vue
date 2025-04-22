
<template>
  <div class="gradient-banner">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ breadcrumb }}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 公告内容 -->
    <div class="banner-content">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>export default {
  name: 'GradientBannerWithBreadcrumb',
  props: {
    title: {
      type: String,
      default: '公告展示'
    },
    description: {
      type: String,
      default: '最新公告信息'
    },
    breadcrumb: {
      type: String,
      default: '公告详情'
    }
  }
}
</script>

<style scoped>.gradient-banner {
  background: linear-gradient(90deg, #4CAF50, #81C784); /* 渐变绿色背景 */
  color: white;
  padding: 20px;
  text-align: center;
  position: relative;
}

.breadcrumb {
  position: absolute;
  top: 10px;
  left: 20px;
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
