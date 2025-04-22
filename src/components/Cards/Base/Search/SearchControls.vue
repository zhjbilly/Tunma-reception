<template>
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
    <div class="sort-filter">
      <button
          :class="['sort-btn', { active: sortBy === 'name' }]"
          @click="toggleSort('name')"
      >
        名称 {{ sortBy === 'name' ? (nameDirection === 'asc' ? '↑' : '↓') : '' }}
      </button>
      <button
          :class="['sort-btn', { active: sortBy === 'date' }]"
          @click="toggleSort('date')"
      >
        日期 {{ sortBy === 'date' ? (dateDirection === 'asc' ? '↑' : '↓') : '' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchControls',
  props: {
    categories: {
      type: Array,
      required: true
    },
    selectedCategory: {
      type: String,
      required: true
    },
    sortBy: {
      type: String,
      required: true
    },
    nameDirection: {
      type: String,
      required: true
    },
    dateDirection: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  watch: {
    searchQuery() {
      this.$emit('search', this.searchQuery);
    }
  },
  methods: {
    selectCategory(category) {
      this.$emit('update:selectedCategory', category);
    },
    toggleSort(sortBy) {
      this.$emit('toggleSort', sortBy);
    }
  }
}
</script>

<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-box {
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
</style>
