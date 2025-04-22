<template>
  <div class="shangpin-liebiao">
    <div class="section-title">
      <h2>精选商品</h2>
      <div class="title-tabs">
        <el-radio-group v-model="activeTab" size="large">
          <el-radio-button label="hot">热卖推荐</el-radio-button>
          <el-radio-button label="new">新品首发</el-radio-button>
          <el-radio-button label="sale">特惠活动</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    
    <el-row :gutter="20">
      <!-- 左侧大图商品列表 -->
      <el-col :span="14" class="product-column">
        <div class="left-products">
          <div 
            v-for="product in mainProducts" 
            :key="product.id"
            class="main-product"
            @click="handleProductClick(product)"
          >
            <el-card :body-style="{ padding: '0px' }">
              <div class="product-content">
                <div class="product-image">
                  <el-image :src="product.image" fit="cover" />
                  <div class="product-badges">
                    <el-tag 
                      v-for="badge in product.badges" 
                      :key="badge.text"
                      :type="badge.type"
                      effect="dark"
                      size="small"
                    >
                      {{ badge.text }}
                    </el-tag>
                  </div>
                </div>
                <div class="product-info">
                  <h3>{{ product.title }}</h3>
                  <p class="description">{{ product.description }}</p>
                  <div class="price-row">
                    <div class="price-info">
                      <span class="price">¥{{ product.price }}</span>
                      <span class="original">¥{{ product.originalPrice }}</span>
                      <span class="discount">{{ product.discount }}折</span>
                    </div>
                    <div class="sales-info">
                      已售 {{ product.sales }} 件
                    </div>
                  </div>
                  <div class="product-tags">
                    <el-tag 
                      v-for="tag in product.tags" 
                      :key="tag"
                      size="small"
                      effect="plain"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-col>
      
      <!-- 右侧小图商品网格 -->
      <el-col :span="10" class="product-column">
        <div class="right-products">
          <el-row :gutter="10">
            <el-col :span="12" v-for="product in sideProducts" :key="product.id">
              <el-card 
                class="side-product"
                shadow="hover"
                :body-style="{ padding: '10px' }"
                @click="handleProductClick(product)"
              >
                <div class="side-image">
                  <el-image :src="product.image" fit="cover" />
                  <div class="promotion-tag" v-if="product.promotion">
                    {{ product.promotion }}
                  </div>
                </div>
                <div class="side-info">
                  <h4>{{ product.title }}</h4>
                  <div class="side-price">
                    <span class="current">¥{{ product.price }}</span>
                    <el-progress 
                      :percentage="product.stockPercentage"
                      :format="formatStock"
                      :stroke-width="4"
                      status="success"
                    />
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('hot')

// 左侧主要商品数据
const mainProducts = ref([
  {
    id: 1,
    title: '2024款 MacBook Pro 16英寸',
    description: 'M3 Max芯片 32核GPU 32GB统一内存 1TB固态硬盘',
    image: 'https://picsum.photos/600/300?random=10',
    price: 21999,
    originalPrice: 23999,
    discount: 9.2,
    sales: 1288,
    badges: [
      { text: '新品', type: 'danger' },
      { text: '限时优惠', type: 'warning' }
    ],
    tags: ['赠送AppleCare+', '24期免息', '晒单返券']
  },
  {
    id: 2,
    title: 'iPhone 15 Pro Max',
    description: 'A17 Pro芯片 6.7英寸超视网膜XDR显示屏 钛金属机身',
    image: 'https://picsum.photos/600/300?random=11',
    price: 9999,
    originalPrice: 10999,
    discount: 9.1,
    sales: 3566,
    badges: [
      { text: '热销', type: 'success' },
      { text: '分期免息', type: 'info' }
    ],
    tags: ['赠送手机壳', '碎屏保修', '以旧换新']
  }
])

// 右侧小图商品数据
const sideProducts = ref([
  {
    id: 3,
    title: 'AirPods Pro 2代',
    image: 'https://picsum.photos/200/200?random=12',
    price: 1799,
    promotion: '限时特价',
    stockPercentage: 70
  },
  {
    id: 4,
    title: 'Apple Watch S9',
    image: 'https://picsum.photos/200/200?random=13',
    price: 3299,
    promotion: '新品上市',
    stockPercentage: 85
  },
  {
    id: 5,
    title: 'iPad Air 5',
    image: 'https://picsum.photos/200/200?random=14',
    price: 4799,
    promotion: '教育优惠',
    stockPercentage: 45
  },
  {
    id: 6,
    title: 'Magic Keyboard',
    image: 'https://picsum.photos/200/200?random=15',
    price: 999,
    promotion: '配件特惠',
    stockPercentage: 90
  }
])

const formatStock = (percentage) => {
  if (percentage < 30) return '库存紧张'
  if (percentage < 70) return '库存充足'
  return '热卖中'
}

const handleProductClick = (product) => {
  ElMessage.success(`点击了商品：${product.title}`)
}
</script>

<style scoped>
.shangpin-liebiao {
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

/* 左侧大图商品样式 */
.main-product {
  flex: 1;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.main-product:hover {
  transform: translateX(5px);
}

.product-content {
  height: 100%;
  display: flex;
  gap: 20px;
}

.product-image {
  position: relative;
  height: 100%;
  width: 300px;
}

.product-image .el-image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.product-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 5px;
}

.product-info {
  flex: 1;
  padding: 10px;
}

.product-info h3 {
  font-size: 18px;
  margin: 0 0 10px;
  color: #333;
}

.description {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.5;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.price-info .price {
  font-size: 24px;
  color: #f56c6c;
  font-weight: bold;
  margin-right: 10px;
}

.price-info .original {
  color: #999;
  text-decoration: line-through;
  font-size: 14px;
  margin-right: 10px;
}

.price-info .discount {
  color: #fff;
  background: #f56c6c;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.sales-info {
  color: #999;
  font-size: 14px;
}

.product-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* 右侧小图商品样式 */
.side-product {
  height: calc(50% - 10px);
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.side-product:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.side-image {
  position: relative;
  height: 60%;
  margin-bottom: 10px;
}

.side-image .el-image {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.promotion-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.side-info {
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.side-info h4 {
  font-size: 14px;
  margin: 0 0 8px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.side-price {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.side-price .current {
  color: #f56c6c;
  font-size: 16px;
  font-weight: bold;
}

/* 适配移动端 */
@media screen and (max-width: 768px) {
  .product-column {
    height: auto;
  }
  
  .side-product {
    height: auto;
    margin-bottom: 20px !important;
  }
  
  .side-image {
    height: 150px;
  }
  
  .product-image {
    width: 100%;
    height: 200px;
  }
}

/* 列高度统一 */
.product-column {
  display: flex;
  flex-direction: column;
}

.left-products,
.right-products {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 左侧样式调整 */
.main-product:last-child {
  margin-bottom: 0;
}

.main-product .el-card {
  height: 100%;
}

/* 右侧样式调整 */
.right-products .el-row {
  height: 100%;
  margin: 0 !important;
}

.side-product:nth-last-child(-n+2) {
  margin-bottom: 0;
}

.side-product .el-card {
  height: 100%;
}

.side-image {
  height: 60%;
}

.side-info {
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 修改一些现有样式 */
.product-content {
  height: 100%;
}

.product-image {
  position: relative;
  height: 100%;
  width: 300px;
}
</style> 