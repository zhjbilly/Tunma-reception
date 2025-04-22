<template>
  <div class="detail-wrapper">
    <div class="detail-container">
      <!-- 藏品基本信息 -->
      <el-card class="detail-card">
        <template #header>
          <div class="card-header">
            <span class="title">{{ collectionInfo.mingcheng }}</span>
            <el-tag :type="collectionInfo.anquan === 'anquan' ? 'success' : 'danger'">
              {{ collectionInfo.anquan === 'anquan' ? '安全' : '危险' }}
            </el-tag>
          </div>
        </template>

        <div class="detail-content">
          <div class="image-section">
            <image-preview
              :src="collectionInfo.zhutu"
              fit="cover"
              :preview-src-list="[collectionInfo.zhutu]"
            >
              <template #error>
                <div class="image-slot">
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </image-preview>
          </div>

          <div class="info-section">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="藏品名称">{{ collectionInfo.mingcheng }}</el-descriptions-item>
              <el-descriptions-item label="藏品等级">
                <el-tag :type="getDengjiType(collectionInfo.dengji)" size="small">
                  {{ formatDengji(collectionInfo.dengji) }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="藏品尺寸">{{ collectionInfo.chicun }}</el-descriptions-item>
              <el-descriptions-item label="藏品重量">{{ collectionInfo.zhongliang }}</el-descriptions-item>
              <el-descriptions-item label="藏品位置">{{ collectionInfo.weizhi }}</el-descriptions-item>
              <el-descriptions-item label="当前温度">{{ collectionInfo.wendu }}℃</el-descriptions-item>
              <el-descriptions-item label="藏品分类">{{ collectionInfo.fenleiMingcheng }}</el-descriptions-item>
              <el-descriptions-item label="仓储位置">{{ collectionInfo.weizhi }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </el-card>

      <!-- 藏品描述 -->
      <el-card class="description-card">
        <template #header>
          <div class="card-header">
            <span class="title">研究文献</span>
          </div>
        </template>
        <div class="description-content" v-html="collectionInfo.yanjiuwenxian"></div>
      </el-card>

      <!-- 藏品流动记录 -->
      <el-card class="flow-card">
        <template #header>
          <div class="card-header">
            <span class="title">流动记录</span>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="item in flowList"
            :key="item.id"
            :timestamp="item.createTime"
            :type="item.zhuangtai === 'jieyue' ? 'success' : 'warning'"
          >
            <el-card>
              <h4>{{ item.mingcheng }}</h4>
              <p>状态：{{ item.zhuangtai === 'jieyue' ? '借阅' : '归还' }}</p>
              <p>类型：<el-tag :type="getJieyueType(item.jieyueleixing)" size="small">{{ formatJieyueLeixing(item.jieyueleixing) }}</el-tag></p>
              <p>备注：{{ item.beizhu }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Picture } from '@element-plus/icons-vue'
import { getCangpinDetail, getLiudongList } from '@/api/cangpin'

const route = useRoute()
const collectionInfo = ref({})
const flowList = ref([])

// 格式化等级显示
const formatDengji = (dengji) => {
  switch(dengji) {
    case 'yijiwenwu':
      return '一级文物'
    case 'erjiwenwu':
      return '二级文物'
    case 'sanjiwenwu':
      return '三级文物'
    default:
      return dengji
  }
}

// 根据等级返回对应的类型
const getDengjiType = (dengji) => {
  switch(dengji) {
    case 'yijiwenwu':
      return 'danger'
    case 'erjiwenwu':
      return 'warning'
    case 'sanjiwenwu':
      return 'info'
    default:
      return ''
  }
}

// 格式化借阅类型显示
const formatJieyueLeixing = (leixing) => {
  switch(leixing) {
    case 'guanjijiaoliu':
      return '馆际交流'
    case 'songcangxiaxiang':
      return '送藏下乡'
    case 'wenhuajinxiaoyuan':
      return '文化进校园'
    default:
      return leixing
  }
}

// 根据借阅类型返回对应的标签类型
const getJieyueType = (leixing) => {
  switch(leixing) {
    case 'guanjijiaoliu':
      return 'success'
    case 'songcangxiaxiang':
      return 'warning'
    case 'wenhuajinxiaoyuan':
      return 'info'
    default:
      return ''
  }
}

// 获取藏品详情
const getDetail = async () => {
  try {
    const res = await getCangpinDetail(route.params.id)
    if (res.code === 200) {
      collectionInfo.value = res.data
      // 获取流动记录
      await getFlowList()
      // 确保滚动条正确显示
      await nextTick()
      document.body.style.overflow = 'auto'
    }
  } catch (error) {
    console.error('获取藏品详情失败:', error)
  }
}

// 获取流动记录
const getFlowList = async () => {
  try {
    const res = await getLiudongList({
      pageNum: 1,
      pageSize: 100,
      changpinId: route.params.id
    })
    if (res.code === 200) {
      flowList.value = res.rows
    }
  } catch (error) {
    console.error('获取流动记录失败:', error)
  }
}

// 监听路由参数变化
watch(() => route.params.id, () => {
  getDetail()
})

onMounted(() => {
  getDetail()
})
</script>

<style scoped>
.detail-wrapper {
  min-height: 100vh;
  background-color: #f5f7fa;
  overflow-y: auto;
}

.detail-container {
  margin: 0 auto;
  padding: 20px;
}

.detail-card,
.description-card,
.flow-card {
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.detail-card:hover,
.description-card:hover,
.flow-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ebeef5;
}

.card-header .title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.detail-content {
  display: flex;
  gap: 30px;
  padding: 20px;
}

.image-section {
  width: 400px;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.image-section :deep(.el-image) {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.image-section:hover :deep(.el-image) {
  transform: scale(1.05);
}

.info-section {
  flex: 1;
}

.info-section :deep(.el-descriptions) {
  padding: 0;
}

.info-section :deep(.el-descriptions__header) {
  margin-bottom: 20px;
}

.info-section :deep(.el-descriptions__label) {
  width: 120px;
  color: #606266;
  font-weight: 500;
}

.info-section :deep(.el-descriptions__content) {
  color: #303133;
}

.description-content {
  padding: 20px;
  line-height: 1.8;
  color: #606266;
  font-size: 15px;
}

/* 流动记录样式 */
.flow-card {
  padding: 20px;
}

.flow-card :deep(.el-timeline) {
  padding: 20px;
}

.flow-card :deep(.el-timeline-item__node) {
  width: 12px;
  height: 12px;
}

.flow-card :deep(.el-timeline-item__content) {
  padding: 10px 0;
}

.flow-card :deep(.el-timeline-item__timestamp) {
  color: #909399;
  font-size: 13px;
  margin-top: 8px;
}

.flow-card :deep(.el-card) {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.flow-card :deep(.el-card:hover) {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.flow-card :deep(.el-card h4) {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.flow-card :deep(.el-card p) {
  margin: 8px 0;
  color: #606266;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.flow-card :deep(.el-card .el-tag) {
  margin-left: auto;
}

/* 响应式布局 */
@media screen and (max-width: 1200px) {
  .detail-container {
    padding: 15px;
    padding-top: 70px;
  }
}

@media screen and (max-width: 768px) {
  .detail-content {
    flex-direction: column;
    gap: 20px;
  }

  .image-section {
    width: 100%;
    height: 250px;
  }

  .card-header {
    padding: 15px;
  }

  .card-header .title {
    font-size: 18px;
  }

  .description-content {
    padding: 15px;
    font-size: 14px;
  }
}
</style>
