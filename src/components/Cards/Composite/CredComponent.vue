<template>
  <div class="cred-container">
    <SearchControls
        :categories="categories"
        :selectedCategory="selectedCategory"
        :sortBy="sortBy"
        :nameDirection="nameDirection"
        :dateDirection="dateDirection"
        @search="handleSearch"
        @update:selectedCategory="selectCategory"
        @toggleSort="toggleSort"
    />
    <CardGrid :items="filteredAndSortedItems"/>
  </div>
</template>

<script>

import SearchControls from "@/components/Cards/Base/Search/SearchControls.vue";
import CardGrid from "@/components/Cards/Base/Card/CardGrid.vue";

export default {
  name: 'CredComponent',
  components: {
    CardGrid,
    SearchControls
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'name', // 默认按名称排序
      nameDirection: 'asc', // 名称排序方向
      dateDirection: 'asc' // 日期排序方向
    }
  },
  computed: {

    filteredAndSortedItems() {
      return this.items
          .filter(item =>
              item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
              (this.selectedCategory ? item.category === this.selectedCategory : true)
          )
          .sort((a, b) => {
            if (this.sortBy === 'name') {
              return this.nameDirection === 'asc' ?
                  a.name.localeCompare(b.name) :
                  b.name.localeCompare(a.name);
            } else {
              return this.dateDirection === 'asc' ?
                  new Date(a.date) - new Date(b.date) :
                  new Date(b.date) - new Date(a.date);
            }
          })
    }
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    toggleSort(sortBy) {
      if (this.sortBy === sortBy) {
        // 如果点击的是当前排序规则，切换方向
        if (sortBy === 'name') {
          this.nameDirection = this.nameDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.dateDirection = this.dateDirection === 'asc' ? 'desc' : 'asc';
        }
      } else {
        // 如果点击的是其他排序规则，切换到该规则，方向保持不变
        this.sortBy = sortBy;
      }
    }
  }
}
</script>

<style scoped>
.cred-container {
  padding: 1rem;
  max-width: 75%;
  margin: 0 auto;
}
</style>
