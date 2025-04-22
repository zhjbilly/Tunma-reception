<script setup>

import GradientBanner from "@/components/Banner/GradientBanner.vue";
import ButtonBanner from "@/components/Banner/ButtonBanner.vue";
import SimpleBanner from "@/components/Banner/SimpleBanner.vue";
</script>

<template>
  <!-- 使用简约风格导航横幅 -->
  <SimpleBanner
      title="简约风格"
      description="这是一个简约风格的导航横幅"
  />
  <!-- 使用渐变背景导航横幅 -->
  <GradientBanner
      title="渐变风格"
      description="这是一个渐变背景的导航横幅"
  />

  <!-- 使用带按钮的导航横幅 -->
  <ButtonBanner
      title="按钮风格"
      description="这是一个带按钮的导航横幅"
      button-text="点击查看"
      @button-click="handleButtonClick"
  />
</template>

<style scoped>

</style>
