<template>
  <div>
    <div class="grid grid-cols-6 h-screen bg-white">
      <!-- 左边栏 -->
      <div class="col-span-6 md:col-span-3 sm:col-span-6">
        <div class="login-container-left flex justify-center items-center flex-col">
          <div class="animate__animated animate__bounceInLeft items-center flex flex-col">
            <h2 class="font-bold text-4xl mb-7 text-white">沈绣博物馆藏品与文化遗产档案管理信息系统 登录</h2>
            <img src="@/assets/developer.png" class="login-image">
          </div>
        </div>
      </div>
      <!-- 右边栏 -->
      <div class="col-span-6 px-3 md:col-span-3 sm:col-span-6">
        <div
            class="login-container-right flex justify-center items-center flex-col animate__animated animate__bounceInRight animate__fast">
          <h2 class="font-bold text-3xl text-gray-800 mt-5">欢迎回来</h2>
          <div class="flex items-center justify-center my-5 text-gray-400 space-x-2">
            <span class="h-[1px] w-16 bg-gray-200"></span>
            <span>账号密码登录</span>
            <span class="h-[1px] w-16 bg-gray-200"></span>
          </div>
          <div>
            <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" :prefix-icon="User" placeholder="请输入用户名" size="large"
                          clearable/>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" :prefix-icon="Lock"
                          placeholder="请输入密码" show-password size="large" @keyup.enter="handleLogin" clearable/>
              </el-form-item>

              <el-form-item prop="code" v-if="captchaEnabled">
                <el-input
                    v-model="loginForm.code"
                    size="large"
                    auto-complete="off"
                    placeholder="验证码"
                    style="width: 63%"
                    @keyup.enter="handleLogin"
                >
                  <template #prefix>
                    <svg-icon icon-class="validCode" class="el-input__icon input-icon"/>
                  </template>
                </el-input>
                <div class="login-code">
                  <img :src="codeUrl" @click="getCode" class="login-code-img"/>
                </div>
              </el-form-item>
              <el-form-item prop="role">
                <el-radio-group v-model="loginForm.role" size="default">
                  <el-radio v-for="(item, index) in roles" :key="index" :label="item.roleId">{{
                      item.roleName
                    }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
              <el-form-item style="width:100%;">
                <el-button
                    :loading="loading"
                    size="large"
                    type="primary"
                    style="width:100%;"
                    @click.prevent="handleLogin"
                >
                  <span v-if="!loading">登 录</span>
                  <span v-else>登 录 中...</span>
                </el-button>
                <div style="float: right;">
                  <router-link class="link-type" :to="'/register'">立即注册</router-link>
                </div>
              </el-form-item>
            </el-form>
          </div>

        </div>
      </div>
    </div>

  </div>


</template>

<script setup>
import {ref} from 'vue';

import {getCodeImg, getRoles} from '@/api/user';
import {setCookie, removeCookie} from '@/utils/auth';
import {User, Lock} from '@element-plus/icons-vue';
import useUserStore from '@/store/modules/user'
import {useRouter} from 'vue-router'

const userStore = useUserStore()

const router = useRouter();

const captchaEnabled = ref(true);
const codeUrl = ref("");


const loginForm = ref({
  username: "",
  password: "",
  rememberMe: false,
  code: "",
  uuid: "",
  role: ""
});


const loginRules = {
  username: [{required: true, trigger: "blur", message: "请输入您的账号"}],
  password: [{required: true, trigger: "blur", message: "请输入您的密码"}],
  code: [{required: true, trigger: "change", message: "请输入验证码"}],
  role: [{required: true, trigger: 'change', message: '请选择角色'}],
};

const loginRef = ref(null);
const loading = ref(false);
const roles = ref([
  {
    "roleId": 4,
    "roleName": "客户"
  }
]);

function handleLogin() {
  loginRef.value.validate(valid => {
    if (valid) {
      loading.value = true;
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        setCookie("username", loginForm.value.username, {expires: 30});
        setCookie("password", encrypt(loginForm.value.password), {expires: 30});
        setCookie("rememberMe", loginForm.value.rememberMe, {expires: 30});
        setCookie("role", loginForm.value.role, {expires: 30});

      } else {
        // 否则移除
        removeCookie("username");
        removeCookie("password");
        removeCookie("rememberMe");
        removeCookie("role");
      }
      // 调用action的登录方法
      userStore.login(loginForm.value).then(() => {
        router.push("/");
      }).catch(() => {
        loading.value = false;
        // 重新获取验证码
        if (captchaEnabled.value) {
          getCode();
        }
      });
    }
  });
}

function getCode() {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginForm.value.uuid = res.uuid;
    }
  });
}


getCode();
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.left-block {
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: center;
}

.right-block {
  flex: 1;
  display: flex;
  justify-content: left;
  align-items: center;
}

.left-block img {
  width: 100%;
  max-width: 500px; /* Adjust the max-width as needed */
  height: auto;
}

.login-box {
  width: 400px; /* Adjust the width as needed */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

.login-box input {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-box button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-code-img {
  height: 40px;
  padding-left: 12px;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 350px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 40px;

    input {
      height: 40px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}

:deep([type='text']:focus) {
  border-color: transparent !important;
}

.login-container {
  height: 100vh;
  width: 100%;
  background-color: #fff;
}

.login-container-left {
  height: 100%;
  background: #001428;
  color: #fff;
}

.login-container-right {
  height: 100%;
}

.login-image {
  /* max-width: 500px;
  height: auto; */
  height: 450px;
}

.login-btn {
}
</style>

