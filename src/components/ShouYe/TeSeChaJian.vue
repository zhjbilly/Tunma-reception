<template>
  <div class="tese-chajian">
    <div class="section-title">
      <h2>特色推荐</h2>
    </div>
    
    <!-- 大卡片布局 -->
    <el-row :gutter="20" class="big-cards">
      <el-col :span="12">
        <div class="feature-card big-card" @click="handleCardClick('新人专享')">
          <div class="card-content">
            <h3>新人专享礼包</h3>
            <p>首单立减50元</p>
            <el-button type="danger" plain>立即领取</el-button>
          </div>
          <div class="card-image">
            <img src="https://picsum.photos/300/200?random=10" alt="新人专享">
          </div>
          <div class="card-badge">新人专享</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="feature-card big-card" @click="handleCardClick('限时秒杀')">
          <div class="card-content">
            <h3>限时秒杀</h3>
            <p>每日10点 爆款直降</p>
            <el-button type="warning" plain>查看活动</el-button>
          </div>
          <div class="card-image">
            <img src="https://picsum.photos/300/200?random=11" alt="限时秒杀">
          </div>
          <div class="card-badge">抢购中</div>
        </div>
      </el-col>
    </el-row>

    <!-- 小卡片布局 -->
    <el-row :gutter="20" class="small-cards">
      <el-col :span="6" v-for="card in smallCards" :key="card.title">
        <div class="feature-card small-card" 
          :style="{ background: card.background }"
          @click="handleCardClick(card.title)"
        >
          <div class="card-content">
            <h4>{{ card.title }}</h4>
            <p>{{ card.desc }}</p>
          </div>
          <div class="card-icon">
            <el-icon :size="30"><component :is="card.icon" /></el-icon>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 品牌展示 -->
    <el-row :gutter="20" class="brand-cards">
      <el-col :span="8" v-for="brand in brands" :key="brand.name">
        <div class="brand-card" @click="handleCardClick(brand.name)">
          <div class="brand-logo">
            <img :src="brand.logo" :alt="brand.name">
          </div>
          <div class="brand-info">
            <h4>{{ brand.name }}</h4>
            <p>{{ brand.slogan }}</p>
            <el-tag size="small" :type="brand.tagType">{{ brand.tag }}</el-tag>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { 
  Present, 
  Clock, 
  DataLine, 
  ShoppingCart 
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const smallCards = [
  {
    title: '签到有礼',
    desc: '每日签到领积分',
    icon: 'Present',
    background: 'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)'
  },
  {
    title: '限时特惠',
    desc: '品牌折扣直降',
    icon: 'Clock',
    background: 'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)'
  },
  {
    title: '热销榜单',
    desc: '实时销量排行',
    icon: 'DataLine',
    background: 'linear-gradient(135deg, #FEC163 0%, #DE4313 100%)'
  },
  {
    title: '会员专区',
    desc: 'VIP专享特权',
    icon: 'ShoppingCart',
    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'
  }
]

const brands = [
  {
    name: 'Apple',
    logo: 'https://picsum.photos/100/100?random=20',
    slogan: '创新科技，改变生活',
    tag: '品牌特惠',
    tagType: 'danger'
  },
  {
    name: 'Samsung',
    logo: 'https://picsum.photos/100/100?random=21',
    slogan: '科技引领未来',
    tag: '新品发布',
    tagType: 'warning'
  },
  {
    name: 'Huawei',
    logo: 'https://picsum.photos/100/100?random=22',
    slogan: '智能生活，触手可及',
    tag: '爆款热销',
    tagType: 'success'
  }
]

const handleCardClick = (title) => {
  ElMessage.success(`点击了${title}卡片`)
}
</script>

<style scoped>
.tese-chajian {
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
  background: linear-gradient(to bottom, #667eea, #764ba2);
  border-radius: 2px;
}

/* 大卡片样式 */
.big-cards {
  margin-bottom: 20px;
}

.feature-card.big-card {
  height: 200px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
}

.feature-card.big-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.card-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-content h3 {
  font-size: 24px;
  margin: 0 0 10px;
  color: #333;
}

.card-content p {
  font-size: 16px;
  color: #666;
  margin: 0 0 20px;
}

.card-image {
  width: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s;
}

.feature-card.big-card:hover .card-image img {
  transform: scale(1.1);
}

.card-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
}

/* 小卡片样式 */
.small-cards {
  margin-bottom: 20px;
}

.feature-card.small-card {
  height: 120px;
  border-radius: 12px;
  padding: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  position: relative;
}

.feature-card.small-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.small-card .card-content {
  padding: 0;
}

.small-card .card-content h4 {
  font-size: 18px;
  margin: 0 0 5px;
}

.small-card .card-content p {
  font-size: 14px;
  margin: 0;
  opacity: 0.8;
}

.small-card .card-icon {
  position: absolute;
  right: 20px;
  opacity: 0.2;
  transform: scale(2);
}

/* 品牌卡片样式 */
.brand-cards {
  margin-bottom: 20px;
}

.brand-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.brand-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.brand-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}

.brand-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-info h4 {
  margin: 0 0 5px;
  font-size: 18px;
}

.brand-info p {
  margin: 0 0 10px;
  color: #666;
  font-size: 14px;
}
</style> 