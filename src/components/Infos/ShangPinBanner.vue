<template>
  <div class="shangpin-banner">
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品详情</el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="actions">
      <el-button
        :type="isFavorite ? 'danger' : 'default'"
        :icon="isFavorite ? 'StarFilled' : 'Star'"
        @click="handleToggleFavorite"
      >
        {{ isFavorite ? '已收藏' : '收藏' }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

defineProps({
  title: {
    type: String,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  productId: {
    type: [String, Number],
    required: true
  },
  favoriteType: {
    type: String,
    default: 'product',
    validator: (value) => ['product', 'shop', 'brand'].includes(value)
  }
})

const emit = defineEmits(['toggleFavorite'])

const handleToggleFavorite = async () => {
  try {
    const action = !props.isFavorite ? '收藏' : '取消收藏'
    console.log('收藏操作：', {
      type: props.favoriteType,
      id: props.productId,
      action
    })

    emit('toggleFavorite')

    ElMessage.success(!props.isFavorite ? '收藏成功' : '已取消收藏')
  } catch (error) {
    ElMessage.error('操作失败，请稍后重试')
    emit('toggleFavorite')
  }
}
</script>

<style scoped>
.shangpin-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 20px;
}
</style>
