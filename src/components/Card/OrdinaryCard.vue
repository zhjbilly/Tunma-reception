<template>
  <div>
    <div class="controls">
      <!-- 搜索框 -->
      <div class="search-box">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索..."
            class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>

      <!-- 分类 -->
      <div class="category-filter">
        <button
            v-for="category in categories"
            :key="category"
            :class="['category-btn', { active: selectedCategory === category }]"
            @click="selectCategory(category)"
        >
          {{ category }}
        </button>
        <button
            :class="['category-btn', { active: selectedCategory === '' }]"
            @click="selectCategory('')"
        >
          所有分类
        </button>
      </div>

      <!-- 排序 -->
<!--      <div class="sort-filter">-->
<!--        <button-->
<!--            :class="['sort-btn', { active: sortBy === 'mingcheng' }]"-->
<!--            @click="toggleSort('mingcheng')"-->
<!--        >-->
<!--          名称 {{ sortBy === 'mingcheng' ? (nameDirection === 'asc' ? '↑' : '↓') : '' }}-->
<!--        </button>-->
<!--        <button-->
<!--            :class="['sort-btn', { active: sortBy === 'createTime' }]"-->
<!--            @click="toggleSort('createTime')"-->
<!--        >-->
<!--          日期 {{ sortBy === 'createTime' ? (dateDirection === 'asc' ? '↑' : '↓') : '' }}-->
<!--        </button>-->
<!--      </div>-->
    </div>

    <div class="card-grid">
      <div
          v-for="item in filteredAndSortedItems"
          :key="item.id"
          class="card-item"
          @click="goToDetail(item.id,item.nameinfo)"
      >
        <img :src="item.image" class="card-image" alt="项目图片">
        <div class="card-body">
          <h3 class="card-title">{{ item.name }}</h3>
          <p class="card-desc" v-html="item.description"></p>
          <div class="card-meta">
            <span class="category-tag">{{ item.category }}</span>
            <span class="date-text">{{ formatDate(item.date) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";


export default {
  name: 'CredComponent',
  props: {
    categories: {
      type: Array,
      required: true
    },
    filteredAndSortedItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'mingcheng', // 默认按名称排序
      nameDirection: 'asc', // 名称排序方向
      dateDirection: 'asc', // 日期排序方向
      direction: 'asc'
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString()
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.$emit('update:category', category); // 通知父组件更新分类
    },
    toggleSort(sortBy) {
      if (this.sortBy === sortBy) {
        // 如果点击的是当前排序规则，切换方向
        if (sortBy === 'mingcheng') {
          this.nameDirection = this.nameDirection === 'asc' ? 'desc' : 'asc';
          this.direction = this.nameDirection;
        } else {
          this.dateDirection = this.dateDirection === 'asc' ? 'desc' : 'asc';
          this.direction = this.dateDirection;
        }

      } else {
        // 如果点击的是其他排序规则，切换到该规则，方向保持不变
        this.sortBy = sortBy;
      }
      this.$emit('update:sort', { sortBy, direction: this[`${sortBy}Direction`] }); // 通知父组件更新排序规则
    },
    goToDetail(id,nameinfo) {
      this.$router.push({name: nameinfo, params: {id}});
    }
  },
  watch: {
    searchQuery(newQuery) {
      this.$emit('update:search', newQuery); // 通知父组件更新搜索词
    }
  },
  setup() {
    const router = useRouter();
    return {router}
  }
}
</script>
<style scoped>
.cred-container {
  padding: 1rem;
  max-width: 75%;
  margin: 0 auto;
}

/* 控制栏整体样式 */
.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 20px;
}

/* 搜索框样式 */
.search-box {
  margin-top: 10px;
  max-width: 300px;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0.5rem;
  background: white;
  transition: all 0.3s ease;
}

.search-box:focus-within {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0 0.5rem;
}

.search-icon {
  font-size: 1rem;
  color: #666;
  cursor: pointer;
}

/* 分类按钮样式 */
.category-filter {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  background: #f0f0f0;
}

.category-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

/* 排序按钮样式 */
.sort-filter {
  display: flex;
  gap: 0.5rem;
}

.sort-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-btn:hover {
  background: #f0f0f0;
}

.sort-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

/* 卡片网格样式 */
.card-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.card-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  overflow: hidden;
}

.card-item:hover {
  transform: translateY(-3px);
}

.card-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

.card-title {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.card-desc {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-tag {
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.date-text {
  color: #888;
  font-size: 0.8rem;
}
</style>
