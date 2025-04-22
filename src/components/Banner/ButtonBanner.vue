<template>
  <div class="button-banner">
    <div class="banner-content">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <button @click="handleButtonClick">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonBanner',
  props: {
    title: {
      type: String,
      default: '公告展示'
    },
    description: {
      type: String,
      default: '查看最新公告'
    },
    buttonText: {
      type: String,
      default: '查看公告'
    }
  },
  methods: {
    handleButtonClick() {
      this.$emit('button-click'); // 触发父组件的事件
    }
  }
}
</script>

<style scoped>
.button-banner {
  background-color: #4CAF50; /* 绿色背景 */
  color: white;
  padding: 20px;
  text-align: center;
}

.banner-content h1 {
  margin: 0;
  font-size: 24px;
}

.banner-content p {
  margin: 10px 0;
  font-size: 16px;
}

button {
  background-color: white;
  color: #4CAF50;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #f1f1f1;
}
</style>
