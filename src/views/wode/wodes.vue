<template>

  <el-tabs :tab-position="tabPosition" :stretch="tabStretch" style="height: auto" class="demo-tabs" v-model="activeTab">
    <el-tab-pane label="个人中心" name="wode"><wode/></el-tab-pane>
  </el-tabs>
</template>
<script lang="js" setup>
import {onMounted, ref,watch} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import wode from './wode.vue'
const route = useRoute();
const tabPosition = ref('left')
const tabStretch = ref(true)
const activeTab = ref('');

onMounted(() => {
  setActiveTabFromQuery();
});

watch(route, () => {
  setActiveTabFromQuery();
});

const setActiveTabFromQuery = () => {
  console.log(route.query.activeTab)
  activeTab.value = route.query.activeTab || 'form';
};



</script>
<style>

</style>
