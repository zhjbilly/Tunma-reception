<template>
  <div class="card">
    <img :src="item.image" alt="Product Image"/>
    <div class="card-content">
      <h3>{{ item.title }}</h3>
      <p>{{ item.date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GonggaoCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 新增：确保内容居中 */
  padding: 20px;
  margin: 10px auto; /* 修改：使卡片居中 */
  width: 45%;
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
}

.card-content {
  text-align: center;
}

.card h3 {
  margin: 0;
  font-size: 18px;
}

.card p {
  margin: 0;
  font-size: 14px;
}
</style>
