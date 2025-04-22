<template>
  <footer class="system-footer">
    <div class="footer-content">
      <div class="footer-logo">
        <h2 class="text-2xl font-bold text-primary">沈绣博物馆藏品与文化遗产档案管理信息系统</h2>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional script needed for this component
</script>

<style scoped>
.system-footer {
  color: #333;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-logo {
  margin-bottom: 30px;
  text-align: center;
}

.footer-links {
  margin-bottom: 30px;
}

.footer-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #409EFF;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: #606266;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #409EFF;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #dcdfe6;
  font-size: 14px;
  color: #909399;
}

@media (max-width: 768px) {
  .footer-links :deep(.el-col) {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
