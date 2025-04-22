<template>
  <div class="xinpin-shangcheng">
    <div class="section-title">
      <h2>新品上架</h2>
      <router-link to="/new" class="more">
        查看更多 <el-icon><ArrowRight /></el-icon>
      </router-link>
    </div>
    
    <el-row :gutter="20">
      <el-col :span="6" v-for="product in products" :key="product.id">
        <div class="product-wrapper">
          <el-card 
            class="product-card" 
            :body-style="{ padding: '0px' }"
          >
            <div class="product-badges">
              <div 
                v-for="tag in product.tags" 
                :key="tag"
                class="badge"
                :class="getBadgeClass(tag)"
              >
                {{ tag }}
              </div>
            </div>
            
            <div class="product-image-container">
              <el-image 
                :src="product.image" 
                fit="cover"
                :preview-src-list="[product.image]"
              >
                <template #placeholder>
                  <div class="image-placeholder">
                    <el-icon><Picture /></el-icon>
                  </div>
                </template>
              </el-image>
              
              <div class="countdown" v-if="product.countdown">
                <span class="countdown-label">距结束</span>
                <el-countdown :value="product.countdown" format="DD 天 HH:mm:ss" />
              </div>
            </div>
            
            <div class="product-content">
              <h3 class="product-title">{{ product.title }}</h3>
              <div class="product-description">{{ product.description }}</div>
              
              <div class="product-features">
                <el-tag 
                  v-for="feature in product.features" 
                  :key="feature"
                  size="small"
                  effect="plain"
                >
                  {{ feature }}
                </el-tag>
              </div>
              
              <div class="product-price">
                <span class="price">¥{{ product.price }}</span>
                <span class="original-price" v-if="product.originalPrice">
                  ¥{{ product.originalPrice }}
                </span>
              </div>
              
              <div class="product-actions">
                <el-button 
                  type="danger" 
                  class="buy-button"
                  @click="handleBuyNow(product)"
                >
                  立即购买
                </el-button>
                <el-button 
                  type="primary" 
                  plain
                  @click="handleAddToCart(product)"
                >
                  加入购物车
                </el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ArrowRight, Picture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

defineProps({
  products: {
    type: Array,
    required: true
  }
})

const getBadgeClass = (tag) => {
  const classes = {
    '新品': 'badge-new',
    '限量': 'badge-limited',
    '预售': 'badge-presale',
    '热销': 'badge-hot'
  }
  return classes[tag] || 'badge-default'
}

const handleAddToCart = (product) => {
  ElMessage.success(`已将 ${product.title} 加入购物车`)
}

const handleBuyNow = (product) => {
  ElMessage.success(`正在跳转到 ${product.title} 的结算页面`)
}
</script>

<style scoped>
.xinpin-shangcheng {
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
  background: linear-gradient(to bottom, #f56c6c, #ff9900);
  border-radius: 2px;
}

.more {
  color: #f56c6c;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s;
}

.more:hover {
  transform: translateX(5px);
}

.product-wrapper {
  margin-bottom: 20px;
  perspective: 1000px;
}

.product-card {
  transform-style: preserve-3d;
  transition: all 0.5s;
}

.product-wrapper:hover .product-card {
  transform: rotateY(5deg);
}

.product-badges {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.badge {
  padding: 4px 8px;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.badge-new {
  background: linear-gradient(45deg, #f56c6c, #ff9900);
}

.badge-limited {
  background: linear-gradient(45deg, #E6A23C, #F56C6C);
}

.badge-presale {
  background: linear-gradient(45deg, #409EFF, #36D1DC);
}

.badge-hot {
  background: linear-gradient(45deg, #F56C6C, #ff4949);
}

.product-image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.el-image {
  width: 100%;
  height: 100%;
  transition: all 0.5s;
}

.product-wrapper:hover .el-image {
  transform: scale(1.1);
}

.image-placeholder {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
  color: #909399;
  font-size: 30px;
}

.countdown {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.7);
  color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.countdown-label {
  font-size: 12px;
}

.product-content {
  padding: 15px;
}

.product-title {
  font-size: 16px;
  margin: 0 0 10px;
  height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-description {
  color: #666;
  font-size: 12px;
  margin-bottom: 10px;
  height: 36px;
  overflow: hidden;
}

.product-features {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 15px 0;
}

.price {
  color: #f56c6c;
  font-size: 24px;
  font-weight: bold;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 14px;
}

.product-actions {
  display: flex;
  gap: 10px;
}

.buy-button {
  flex: 2;
}

.product-actions .el-button {
  flex: 1;
}
</style> 