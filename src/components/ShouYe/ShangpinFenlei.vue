<template>
  <div class="shangpin-fenlei">
    <div class="section-title">
      <h2>商品分类</h2>
    </div>
    
    <el-row :gutter="20">
      <el-col :span="4" v-for="category in categories" :key="category.id">
        <el-card class="category-card" shadow="hover">
          <div class="category-icon">
            <el-icon :size="40"><component :is="category.icon" /></el-icon>
          </div>
          <div class="category-name">{{ category.name }}</div>
          <div class="category-children">
            <router-link 
              v-for="child in category.children" 
              :key="child"
              :to="`/category/${category.id}`"
            >
              {{ child }}
            </router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Phone, ShoppingBag, Monitor, Present, Football } from '@element-plus/icons-vue'

defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.shangpin-fenlei {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  margin-bottom: 20px;
}

.section-title h2 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.category-card {
  text-align: center;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-icon {
  color: #409EFF;
  margin-bottom: 10px;
}

.category-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.category-children {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.category-children a {
  color: #666;
  font-size: 12px;
  text-decoration: none;
}

.category-children a:hover {
  color: #409EFF;
}
</style> 