<template>
  <div class="container mx-auto px-4 py-8">
    <el-card class="user-details-card">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">用户详情</h2>
        </div>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <div class="flex flex-col items-center">
            <el-avatar :size="120" v-model="state.user.avatar" :src="getImage(state.user.avatar)"/>
            <el-upload
                class="avatar-uploader mt-4"
                :headers="headers"
                :action="uploadImgUrl"
                :show-file-list="false"
                :on-success="handleSuccess"
                :before-upload="beforeAvatarUpload"
            >
              <el-button size="small" type="primary">更换头像</el-button>
            </el-upload>
          </div>
        </div>

        <div class="md:col-span-2">
          <el-form :model="state.user" label-position="top" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- 第一列 -->
            <div class="md:col-span-1">
              <el-form-item label="账号">
                <el-input v-model="state.user.userName" disabled></el-input>
              </el-form-item>

              <el-form-item label="昵称">
                <el-input v-model="state.user.nickName"></el-input>
              </el-form-item>

              <el-form-item label="手机号">
                <el-input v-model="state.user.phonenumber"></el-input>
              </el-form-item>
            </div>

            <!-- 第二列 -->
            <div class="md:col-span-1">
              <el-form-item label="邮箱">
                <el-input v-model="state.user.email"></el-input>
              </el-form-item>

              <el-form-item label="余额">
                <el-input v-model="state.user.yue" disabled>
                  <template #prepend>￥</template>
                </el-input>
              </el-form-item>

              <div class="mt-6">
                <h3 class="text-lg font-medium mb-2">充值余额</h3>
                <el-input-number v-model="rechargeAmount" :min="1" :max="10000" class="mr-4"></el-input-number>
                <el-button type="success" @click="rechargeBalance">充值</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>

      <div class="mt-8 flex justify-end space-x-4">
        <el-button type="primary" @click="saveChanges">保存更改</el-button>
        <el-button type="danger" @click="logout">退出登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'
import {chongzhi, editUser, getUserProfile} from "@/api/user.js";
import {getToken, removeToken} from "@/utils/auth.js";
import router from "@/router/index.js";
import {getImage} from "@/api/util.js";

const uploadImgUrl = ref(import.meta.env.VITE_APP_BASE_API + "/common/upload"); // 上传的图片服务器地址
const headers = ref({Authorization: "Bearer " + getToken()});

const rechargeAmount = ref(100)

const beforeAvatarUpload = (file) => {
  const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPGorPNG) {
    ElMessage.error('头像必须是 JPG 或 PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('头像大小不能超过 2MB!')
  }
  return isJPGorPNG && isLt2M
}

const handleSuccess = (response, file) => {
  if (response.code === 200) {
    state.user.avatar = response.fileName
    editUser(state.user).then((res) => {
      if (res.code === 200) {
        ElMessage.success('图片上传成功')
        getUser();
      }
    })
  }
}

const handleError = (err, file) => {
  // 处理上传失败后的逻辑
  console.error('上传失败', err, file)
}

const saveChanges = () => {
  editUser(state.user).then((res) => {
    if (res.code === 200) {
      ElMessage.success('更改保存成功')
      getUser();
    }
  })
}

const rechargeBalance = () => {
  chongzhi(rechargeAmount.value).then(res => {
    if (res.code === 200) {
      ElMessage.success('充值成功')
      getUser();
    }
  })
}

const state = reactive({
  user: {},
})

const logout = () => {
  ElMessage.success('退出登录成功')
  removeToken()
  router.push('/login')
}

function getUser() {
  getUserProfile().then(response => {
    state.user = response.data;
    state.avatar = getImage(state.user.avatar);
  });
}

getUser();
</script>

<style scoped>
.user-details-card {
  width: 1200px; /* 设置固定宽度 */
  margin: 0 auto;
}

.avatar-uploader {
  text-align: center;
}

:deep(.el-upload) {
  width: 100%;
}
</style>
