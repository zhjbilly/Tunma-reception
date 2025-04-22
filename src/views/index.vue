<template>
  <!-- 藏品展示 -->
  <GradientBanner
      :title="currentFenlei ? `${currentFenlei.fenleiMingcheng} - 藏品展示` : '藏品展示'"
      description="COLLECTION SHOWCASE"
  />
  <div class="collection-container">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in filteredCollectionList" :key="item.id">
        <el-card class="collection-card" shadow="hover" @click="handleCollectionClick(item)">
          <div class="collection-image">
            <image-preview
              :src="item.zhutu"
              fit="cover"
              :preview-src-list="[item.zhutu]"
            >
              <template #error>
                <div class="image-slot">
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </image-preview>
          </div>
          <div class="collection-info">
            <h4>{{ item.mingcheng }}</h4>
            <p>等级：<el-tag :type="getDengjiType(item.dengji)" size="small">{{ formatDengji(item.dengji) }}</el-tag></p>
            <p>尺寸：{{ item.chicun }}</p>
            <p>重量：{{ item.zhongliang }}</p>
            <p>位置：{{ item.weizhi }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <!-- 当前藏品的流动信息 -->
  <template v-if="selectedCollection">
    <GradientBanner
        :title="`${selectedCollection.mingcheng} - 流动记录`"
        description="FLOW RECORDS"
    />
    <div class="flow-container">
      <el-timeline>
        <el-timeline-item
            v-for="item in filteredFlowList"
            :key="item.id"
            :timestamp="item.createTime"
            :type="item.zhuangtai === 'jieyue' ? 'success' : 'warning'"
        >
          <el-card>
            <h4>{{ item.mingcheng }}</h4>
            <p>状态：{{ item.zhuangtai === 'jieyue' ? '借阅' : '归还' }}</p>
            <p>类型：<el-tag :type="getJieyueType(item.jieyueleixing)" size="small">{{ formatJieyueLeixing(item.jieyueleixing) }}</el-tag></p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </template>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Picture } from '@element-plus/icons-vue'
import { getFenleiList, getCangpinList, getLiudongList } from '@/api/cangpin'
import GradientBanner from "@/components/Banner/GradientBanner.vue"
import ImagePreview from "@/components/ImagePreview/index.vue";
const route = useRoute()
const router = useRouter()
const fenleiList = ref([])
const cangpinList = ref([])
const liudongList = ref([])
const selectedCollection = ref(null)
const currentFenlei = ref(null)

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

// 获取藏品分类列表
const getFenleiData = async () => {
  try {
    const res = await getFenleiList({
      pageNum: 1,
      pageSize: 100
    })
    if (res.code === 200) {
      fenleiList.value = res.rows
      // 如果有分类ID，设置当前分类
      if (route.query.fenleiId) {
        currentFenlei.value = res.rows.find(item => item.id === Number(route.query.fenleiId))
      }
    }
  } catch (error) {
    console.error('获取分类列表失败:', error)
  }
}

// 获取藏品列表
const getCangpinData = async (fenleiId) => {
  try {
    console.log('开始获取藏品列表，分类ID:', fenleiId)
    const params = {
      pageNum: 1,
      pageSize: 100,
      cangchuId: '',
      mingcheng: '',
      dengji: '',
      anquan: '',
      fenleiId: fenleiId || ''
    }
    console.log('查询参数:', params)
    const res = await getCangpinList(params)
    if (res.code === 200) {
      cangpinList.value = res.rows
      console.log('获取藏品列表成功，数量:', res.rows.length)
    } else {
      console.error('获取藏品列表失败，错误码:', res.code)
    }
  } catch (error) {
    console.error('获取藏品列表异常:', error)
  }
}

// 获取流动信息
const getLiudongData = async () => {
  try {
    const res = await getLiudongList({
      pageNum: 1,
      pageSize: 100,
      changpinId: selectedCollection.value?.id || ''
    })
    if (res.code === 200) {
      liudongList.value = res.rows
    }
  } catch (error) {
    console.error('获取流动信息失败:', error)
  }
}

// 过滤当前分类下的藏品
const filteredCollectionList = computed(() => {
  return cangpinList.value
})

// 过滤当前藏品的流动记录
const filteredFlowList = computed(() => {
  if (!selectedCollection.value) return []
  return liudongList.value.filter(item => item.cangpinId === selectedCollection.value.id)
})

// 处理藏品点击
const handleCollectionClick = (item) => {
  router.push(`/detail/${item.id}`)
}

// 监听路由参数变化
watch(() => route.query.fenleiId, async (newVal) => {
  console.log('路由参数变化，新的分类ID:', newVal)
  if (newVal) {
    // 先获取分类列表，确保有最新的分类数据
    await getFenleiData()
    const selectedFenlei = fenleiList.value.find(item => item.id === Number(newVal))
    if (selectedFenlei) {
      currentFenlei.value = selectedFenlei
      console.log('找到对应分类:', selectedFenlei)
      await getCangpinData(newVal)
    }
  } else {
    currentFenlei.value = null
    await getCangpinData('')
  }
}, { immediate: true, deep: true })

onMounted(async () => {
  console.log('组件挂载，开始初始化数据')
  await getFenleiData()
  // 如果有分类ID，获取对应藏品
  if (route.query.fenleiId) {
    console.log('初始分类ID:', route.query.fenleiId)
    await getCangpinData(route.query.fenleiId)
  } else {
    console.log('无初始分类ID，获取所有藏品')
    await getCangpinData('')
  }
})
</script>

<style scoped>
.collection-container,
.flow-container {
  margin: 20px 0;
}

.collection-card {
  margin-bottom: 20px;
  cursor: pointer;
}

.collection-image {
  height: 200px;
  overflow: hidden;
}

.collection-image .el-image {
  width: 100%;
  height: 100%;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 30px;
}

.collection-info {
  padding: 15px;
}

.collection-info h4 {
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.collection-info p {
  margin: 8px 0;
  color: #606266;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.collection-info p :deep(.el-tag) {
  margin-left: auto;
}
</style>
