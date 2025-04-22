<template>
  <div class="card-container">
    <!-- 左侧卡片 -->
    <div class="left-card">
      <div class="card">
        <img :src="cards[0].image" alt="卡片图片" class="card-image" />
        <div class="card-content">
          <h3>{{ cards[0].title }}</h3>
          <p>{{ cards[0].description }}</p>
          <div class="tags">
            <span v-for="(tag, index) in cards[0].tags" :key="index" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧田字布局卡片 -->
    <div class="right-grid">
      <div class="card" v-for="(card, index) in cards.slice(1)" :key="index">
        <img :src="card.image" alt="卡片图片" class="card-image" />
        <div class="card-content">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <div class="tags">
            <span v-for="(tag, index) in card.tags" :key="index" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpecialCardList',
  props: {
    cards: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  gap: 16px; /* 左右卡片之间的间距 */
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.left-card {
  flex: 1; /* 左侧卡片占 1 份 */
  display: flex;
  align-items: stretch; /* 让卡片拉伸以占满高度 */
}

.right-grid {
  flex: 2; /* 右侧田字布局占 2 份 */
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列 */
  grid-template-rows: repeat(2, 1fr); /* 两行 */
  gap: 16px; /* 卡片之间的间距 */
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.left-card .card {
  aspect-ratio: 1 / 1; /* 左侧卡片为方形 */
}

.right-grid .card {
  aspect-ratio: 1 / 1; /* 右侧卡片为方形 */
}

.card-image {
  width: 100%;
  height: 100%; /* 图片占满卡片高度 */
  object-fit: cover; /* 图片适应卡片尺寸 */
}

.card-content {
  padding: 16px;
}

.card-content h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.card-content p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.tags {
  margin-top: 12px;
}

.tag {
  display: inline-block;
  padding: 4px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 8px;
}
</style>
