<template>
  <div class="shangpin-xinxi">
    <div class="product-gallery">
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="(image, index) in product.images" :key="index">
          <img :src="image" :alt="product.title" />
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <div class="product-details">
      <h1>{{ product.title }}</h1>
      <div class="price">¥{{ product.price }}</div>
      
      <!-- 商品参数 -->
      <div class="parameters">
        <el-descriptions :column="1" border>
          <el-descriptions-item v-for="(param, key) in product.parameters" 
            :key="key" 
            :label="key"
          >
            {{ param }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      
      <!-- 选择数量 -->
      <div class="quantity">
        <span class="label">购买数量：</span>
        <el-input-number 
          v-model="quantity" 
          :min="1" 
          :max="99"
          size="large"
        />
      </div>
      
      <div class="actions">
        <el-button type="primary" @click="$emit('addToCart')">
          加入购物车
        </el-button>
        <el-button type="danger" @click="$emit('buyNow')">
          立即购买
        </el-button>
        <el-button @click="$emit('openChat')">
          联系客服
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineComponent } from 'vue'

defineComponent({
  name: 'ShangPinXinxi'
})

defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['addToCart', 'buyNow', 'openChat'])

const quantity = ref(1)
</script>

<style scoped>
.shangpin-xinxi {
  display: flex;
  gap: 40px;
  padding: 20px;
  background-color: #fff;
}

.product-gallery {
  flex: 1;
}

.product-details {
  flex: 1;
}

.price {
  color: #f56c6c;
  font-size: 24px;
  margin: 20px 0;
}

.parameters {
  margin: 20px 0;
}

.quantity {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity .label {
  font-size: 14px;
  color: #606266;
}

.actions {
  margin-top: 30px;
  display: flex;
  gap: 10px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style> 