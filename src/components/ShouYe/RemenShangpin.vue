<template>
  <div class="remen-shangpin">
    <div class="section-title">
      <h2>热门商品</h2>
      <router-link to="/hot" class="more">
        查看更多 <el-icon><ArrowRight /></el-icon>
      </router-link>
    </div>
    
    <el-row :gutter="20">
      <el-col :span="6" v-for="product in products" :key="product.id">
        <el-card 
          class="product-card" 
          shadow="hover"
          :body-style="{ padding: '0px' }"
        >
          <div class="product-image-wrapper">
            <img :src="product.image" class="product-image">
            <div class="product-overlay">
              <div class="quick-view">
                <el-button type="primary" circle>
                  <el-icon><View /></el-icon>
                </el-button>
                <el-button type="danger" circle>
                  <el-icon><Star /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
          
          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            <div class="product-meta">
              <el-rate 
                v-model="product.rating" 
                disabled 
                text-color="#ff9900"
                show-score
              />
              <span class="review-count">({{ product.reviewCount }}条评价)</span>
            </div>
            <div class="product-price">
              <span class="current-price">¥{{ product.price }}</span>
              <span class="original-price">¥{{ product.originalPrice }}</span>
              <el-tag type="danger" size="small" effect="dark">
                {{ Math.round((1 - product.price/product.originalPrice) * 100) }}% OFF
              </el-tag>
            </div>
            <div class="product-stats">
              <span class="sales">已售 {{ product.sales }} 件</span>
              <el-progress 
                :percentage="Math.min((product.sales/product.stock)*100, 100)"
                :format="format"
                status="success"
              />
            </div>
            <div class="product-actions">
              <el-button type="primary" size="small" @click="handleAddToCart(product)">
                <el-icon><ShoppingCart /></el-icon>
                加入购物车
              </el-button>
              <el-button type="danger" size="small" @click="handleBuyNow(product)">
                立即购买
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ArrowRight, View, Star, ShoppingCart } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

defineProps({
  products: {
    type: Array,
    required: true
  }
})

const format = (percentage) => percentage < 100 ? '库存充足' : '即将售罄'

const handleAddToCart = (product) => {
  ElMessage.success(`已将 ${product.title} 加入购物车`)
}

const handleBuyNow = (product) => {
  ElMessage.success(`正在跳转到 ${product.title} 的结算页面`)
}
</script>

<style scoped>
.remen-shangpin {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background: linear-gradient(to bottom, #409EFF, #36D1DC);
  border-radius: 2px;
}

.more {
  color: #409EFF;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s;
}

.more:hover {
  transform: translateX(5px);
}

.product-card {
  margin-bottom: 20px;
  transition: all 0.3s;
  border-radius: 8px;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.product-image-wrapper {
  position: relative;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: all 0.5s;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.3s;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.quick-view {
  display: flex;
  gap: 10px;
  transform: translateY(20px);
  transition: all 0.3s;
}

.product-card:hover .quick-view {
  transform: translateY(0);
}

.product-info {
  padding: 15px;
}

.product-title {
  font-size: 16px;
  margin: 10px 0;
  height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.review-count {
  color: #999;
  font-size: 12px;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.current-price {
  color: #f56c6c;
  font-size: 20px;
  font-weight: bold;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 14px;
}

.product-stats {
  margin: 10px 0;
}

.sales {
  color: #666;
  font-size: 12px;
  margin-bottom: 5px;
  display: block;
}

.product-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.product-actions .el-button {
  flex: 1;
}
</style> 