<template>
  <div :class="{ 'app': !isBlankLayout }">
    <el-container>
      <el-header v-if="!isBlankLayout">
        <Menu/>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer v-if="!isBlankLayout">
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import Menu from '@/components/menu.vue';
import Footer from "@/components/footer.vue";
import {useRoute} from 'vue-router';
import {computed} from "vue";


const route = useRoute();

const isBlankLayout = computed(() => {
  return route.meta.layout === 'blank';
});
</script>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 75%;
  margin: 20px auto;
  padding: 20px;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.el-header {
}

.el-main {
  flex: 1;
  background-color: #fff;
  color: #409eff;
}

.el-footer {
  background-color: #e0e0e0;
}
</style>
