<script setup>

import ThumbnailCarousel from "@/components/Lunbotu/ThumbnailCarousel.vue";
import FullscreenCarousel from "@/components/Lunbotu/FullscreenCarousel.vue";
import FadeCarousel from "@/components/Lunbotu/FadeCarousel.vue";
import BasicCarousel from "@/components/Lunbotu/BasicCarousel.vue";
import CardCarousel from "@/components/Lunbotu/CardCarousel.vue";
import GradientBanner from "@/components/Banner/GradientBanner.vue";
import ButtonBanner from "@/components/Banner/ButtonBanner.vue";
import SimpleBanner from "@/components/Banner/SimpleBanner.vue";
import VerticalCarousel from "@/components/Lunbotu/VerticalCarousel.vue";
import {ref} from "vue";

const images = ref([
  {
    id: 1,
    url: 'https://picsum.photos/1000/600?random=1',
    title: '图片 1',
    description: '这是第一张图片的描述'
  },
  {
    id: 2,
    url: 'https://picsum.photos/1000/600?random=2',
    title: '图片 2',
    description: '这是第二张图片的描述'
  },
  {
    id: 3,
    url: 'https://picsum.photos/1000/600?random=3',
    title: '图片 3',
    description: '这是第三张图片的描述'
  },
  {
    id: 4,
    url: 'https://picsum.photos/1000/600?random=4',
    title: '图片 4',
    description: '这是第四张图片的描述'
  }
])
</script>

<template>
  <!-- 基础轮播图 -->
  <el-card class="carousel-card">
    <template #header>
      <div class="card-header">
        <h3>基础轮播图</h3>
      </div>
    </template>
    <BasicCarousel
        :images="images"
        height="500px"
        :interval="4000"
        :autoplay="true"
        trigger="hover"
        arrow="hover"
    />
  </el-card>

  <!-- 卡片式轮播图 -->
  <el-card class="carousel-card">
    <template #header>
      <div class="card-header">
        <h3>卡片式轮播图</h3>
      </div>
    </template>
    <CardCarousel
        :images="images"
        height="400px"
        :interval="4000"
        :autoplay="true"
        trigger="hover"
        arrow="always"
    />
  </el-card>

  <!-- 渐变轮播图 -->
  <el-card class="carousel-card">
    <template #header>
      <div class="card-header">
        <h3>渐变轮播图</h3>
      </div>
    </template>
    <FadeCarousel
        :images="images"
        height="600px"
        :interval="4000"
        :autoplay="true"
        trigger="hover"
        arrow="hover"
    />
  </el-card>

  <!-- 垂直轮播图 -->
  <el-card class="carousel-card">
    <template #header>
      <div class="card-header">
        <h3>垂直轮播图</h3>
      </div>
    </template>
    <VerticalCarousel
        :images="images"
        height="500px"
        :interval="4000"
        :autoplay="false"
        trigger="click"
        arrow="always"
    />
  </el-card>

  <!-- 缩略图轮播图 -->
  <el-card class="carousel-card">
    <template #header>
      <div class="card-header">
        <h3>缩略图轮播图</h3>
      </div>
    </template>
    <ThumbnailCarousel
        :images="images"
        height="500px"
        :interval="4000"
        :autoplay="false"
        trigger="click"
        arrow="always"
    />
  </el-card>

  <!-- 全屏轮播图 -->
  <el-card class="carousel-card">
    <template #header>
      <div class="card-header">
        <h3>全屏轮播图</h3>
      </div>
    </template>
    <FullscreenCarousel
        :images="images"
        height="600px"
        :interval="5000"
        :autoplay="true"
        trigger="hover"
        arrow="hover"
    />
  </el-card>


</template>

<style scoped>

</style>
