<template>
  <div class="shangpin-zhanshi">
    <div class="section-title">
      <h2>商品推荐</h2>
    </div>
    
    <el-row :gutter="20">
      <!-- 左侧大卡片 -->
      <el-col :span="8">
        <div class="feature-product" @click="handleProductClick(featuredProduct)">
          <el-card class="h-full" :body-style="{ padding: '0' }">
            <div class="feature-image">
              <el-image :src="featuredProduct.image" fit="cover" />
              <div class="feature-tag">主打推荐</div>
            </div>
            <div class="feature-info">
              <h3>{{ featuredProduct.title }}</h3>
              <div class="feature-desc">{{ featuredProduct.description }}</div>
              <div class="feature-price">
                <span class="price">¥{{ featuredProduct.price }}</span>
                <span class="original">¥{{ featuredProduct.originalPrice }}</span>
              </div>
              <div class="feature-action">
                <el-button type="danger" size="large">立即抢购</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      
      <!-- 右侧小卡片网格 -->
      <el-col :span="16">
        <el-row :gutter="20">
          <el-col :span="12" v-for="product in gridProducts" :key="product.id">
            <el-card 
              class="grid-product" 
              shadow="hover"
              @click="handleProductClick(product)"
            >
              <div class="grid-image">
                <el-image :src="product.image" fit="cover" />
                <div class="grid-tag" v-if="product.tag">{{ product.tag }}</div>
              </div>
              <div class="grid-info">
                <h4>{{ product.title }}</h4>
                <div class="grid-price">
                  <span class="price">¥{{ product.price }}</span>
                  <el-button type="primary" size="small" plain>查看详情</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 主打商品数据
const featuredProduct = ref({
  id: 1,
  title: 'iPhone 15 Pro Max',
  description: '超强A17 Pro芯片，4800万像素主摄，钛金属机身设计',
  image: 'https://picsum.photos/600/800?random=1',
  price: 9999,
  originalPrice: 10999,
  tag: '新品'
})

// 网格商品数据
const gridProducts = ref([
  {
    id: 2,
    title: 'MacBook Air M2',
    image: 'https://picsum.photos/300/300?random=2',
    price: 7999,
    tag: '热销'
  },
  {
    id: 3,
    title: 'iPad Pro 2024',
    image: 'https://picsum.photos/300/300?random=3',
    price: 6299,
    tag: '预售'
  },
  {
    id: 4,
    title: 'AirPods Pro 2',
    image: 'https://picsum.photos/300/300?random=4',
    price: 1999,
    tag: '限量'
  },
  {
    id: 5,
    title: 'Apple Watch S9',
    image: 'https://picsum.photos/300/300?random=5',
    price: 3299,
    tag: '新品'
  }
])

const handleProductClick = (product) => {
  ElMessage.success(`点击了商品：${product.title}`)
}
</script>

<style scoped>
.shangpin-zhanshi {
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
  position: relative;
  padding-left: 15px;
}

.section-title h2::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: linear-gradient(to bottom, #f56c6c, #ff9900);
  border-radius: 2px;
}

/* 左侧大卡片样式 */
.feature-product {
  height: 100%;
  cursor: pointer;
}

.h-full {
  height: 100%;
}

.feature-image {
  position: relative;
  height: 400px;
}

.feature-image .el-image {
  width: 100%;
  height: 100%;
}

.feature-tag {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #f56c6c, #ff9900);
  color: #fff;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 14px;
}

.feature-info {
  padding: 20px;
}

.feature-info h3 {
  font-size: 20px;
  margin: 0 0 10px;
  color: #333;
}

.feature-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.5;
}

.feature-price {
  margin-bottom: 15px;
}

.feature-price .price {
  font-size: 24px;
  color: #f56c6c;
  font-weight: bold;
  margin-right: 10px;
}

.feature-price .original {
  color: #999;
  text-decoration: line-through;
  font-size: 14px;
}

.feature-action {
  text-align: center;
}

/* 右侧网格卡片样式 */
.grid-product {
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.grid-product:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.grid-image {
  position: relative;
  height: 180px;
}

.grid-image .el-image {
  width: 100%;
  height: 100%;
}

.grid-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.grid-info {
  padding: 15px;
}

.grid-info h4 {
  font-size: 16px;
  margin: 0 0 10px;
  color: #333;
}

.grid-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grid-price .price {
  font-size: 18px;
  color: #f56c6c;
  font-weight: bold;
}
</style> 