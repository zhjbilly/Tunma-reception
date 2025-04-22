<template>
  <div class="product-tabs">
    <el-tabs>
      <el-tab-pane label="商品详情">
        <div v-html="detail.description"></div>
        <div class="specifications">{{ detail.specifications }}</div>
      </el-tab-pane>
      
      <el-tab-pane label="商品评价">
        <div class="reviews">
          <div v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <el-avatar :src="review.user.avatar" />
              <span class="username">{{ review.user.name }}</span>
              <el-rate
                v-model="review.rating"
                disabled
                show-score
              />
            </div>
            
            <div class="review-content">{{ review.content }}</div>
            
            <div class="review-images" v-if="review.images.length">
              <el-image
                v-for="(image, index) in review.images"
                :key="index"
                :src="image"
                :preview-src-list="review.images"
                fit="cover"
              />
            </div>
            
            <div class="review-time">{{ review.createTime }}</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
defineProps({
  detail: {
    type: Object,
    required: true
  },
  reviews: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.product-tabs {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
}

.review-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.review-content {
  margin: 10px 0;
}

.review-images {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.review-images .el-image {
  width: 100px;
  height: 100px;
}

.review-time {
  color: #999;
  font-size: 14px;
}
</style> 