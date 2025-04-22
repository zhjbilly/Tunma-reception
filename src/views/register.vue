<template>
  <div>
    <div class="grid grid-cols-6 h-screen bg-white">
      <!-- 左边栏 -->
      <div class="col-span-6 md:col-span-3 sm:col-span-6">
        <div class="login-container-left flex justify-center items-center flex-col">
          <div class="animate__animated animate__bounceInLeft items-center flex flex-col">
            <h2 class="font-bold text-4xl mb-7 text-white">沈绣博物馆藏品与文化遗产档案管理信息系统 注册</h2>
            <img src="@/assets/developer.png" class="login-image">
          </div>
        </div>
      </div>
      <!-- 右边栏 -->
      <div class="col-span-6 px-3 md:col-span-3 sm:col-span-6">
        <div
            class="login-container-right flex justify-center items-center flex-col animate__animated animate__bounceInRight animate__fast">
          <h2 class="font-bold text-3xl text-gray-800 mt-5">欢迎您的回来</h2>
          <div class="flex items-center justify-center my-5 text-gray-400 space-x-2">
            <span class="h-[1px] w-16 bg-gray-200"></span>
            <span>用户注册</span>
            <span class="h-[1px] w-16 bg-gray-200"></span>
          </div>
          <div>
            <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="register-form">
              <el-form-item prop="userName">
                <el-input
                    v-model="registerForm.username"
                    type="text"
                    size="large"
                    auto-complete="off"
                    placeholder="账号"
                >
                  <template #prefix>
                    <svg-icon icon-class="user" class="el-input__icon input-icon"/>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item prop="nickName">
                <el-input
                    v-model="registerForm.nickName"
                    type="text"
                    size="large"
                    auto-complete="off"
                    placeholder="昵称"
                >
                  <template #prefix>
                    <svg-icon icon-class="user" class="el-input__icon input-icon"/>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input
                    v-model="registerForm.password"
                    type="password"
                    size="large"
                    auto-complete="off"
                    placeholder="密码"
                    @keyup.enter="handleRegister"
                >
                  <template #prefix>
                    <svg-icon icon-class="password" class="el-input__icon input-icon"/>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <el-input
                    v-model="registerForm.confirmPassword"
                    type="password"
                    size="large"
                    auto-complete="off"
                    placeholder="确认密码"
                    @keyup.enter="handleRegister"
                >
                  <template #prefix>
                    <svg-icon icon-class="password" class="el-input__icon input-icon"/>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="code" v-if="captchaEnabled">
                <el-input
                    size="large"
                    v-model="registerForm.code"
                    auto-complete="off"
                    placeholder="验证码"
                    style="width: 63%"
                    @keyup.enter="handleRegister"
                >
                  <template #prefix>
                    <svg-icon icon-class="validCode" class="el-input__icon input-icon"/>
                  </template>
                </el-input>
                <div class="register-code">
                  <img :src="codeUrl" @click="getCode" class="register-code-img"/>
                </div>
              </el-form-item>
              <el-form-item style="width:100%;">
                <el-button
                    :loading="loading"
                    size="large"
                    type="primary"
                    style="width:100%;"
                    @click.prevent="handleRegister"
                >
                  <span v-if="!loading">注 册</span>
                  <span v-else>注 册 中...</span>
                </el-button>
                <div style="float: right;">
                  <router-link class="link-type" :to="'/login'">使用已有账户登录</router-link>
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
import {ElMessageBox} from "element-plus";
import {getCodeImg, register} from "@/api/user.js";
import {getCurrentInstance, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const {proxy} = getCurrentInstance();

const registerForm = ref({
  username: "",
  nickName: "",
  password: "",
  confirmPassword: "",
  code: "",
  uuid: ""
});

const equalToPassword = (rule, value, callback) => {
  if (registerForm.value.password !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

const registerRules = {
  username: [
    {required: true, trigger: "blur", message: "请输入您的账号"},
    {min: 2, max: 20, message: "用户账号长度必须介于 2 和 20 之间", trigger: "blur"}
  ],
  nickName: [
    {required: true, trigger: "blur", message: "请输入您的昵称"}
  ],
  password: [
    {required: true, trigger: "blur", message: "请输入您的密码"},
    {min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur"},
    {pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\\ |", trigger: "blur"}
  ],
  confirmPassword: [
    {required: true, trigger: "blur", message: "请再次输入您的密码"},
    {required: true, validator: equalToPassword, trigger: "blur"}
  ],
  code: [{required: true, trigger: "change", message: "请输入验证码"}],
};

const codeUrl = ref("");
const loading = ref(false);
const captchaEnabled = ref(true);

function handleRegister() {
  proxy.$refs.registerRef.validate(valid => {
    if (valid) {
      loading.value = true;
      registerForm.value.userName = registerForm.value.username;
      register(registerForm.value).then(res => {
        const userName = registerForm.value.username;
        ElMessageBox.alert("<font color='red'>恭喜你，您的账号 " + userName + " 注册成功！</font>", "系统提示", {
          dangerouslyUseHTMLString: true,
          type: "success",
        }).then(() => {
          router.push("/login");
        }).catch(() => {
        });
      }).catch(() => {
        loading.value = false;
        if (captchaEnabled) {
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
      registerForm.value.uuid = res.uuid;
    }
  });
}

getCode();
</script>

<style scoped>

.left-block img {
  width: 100%;
  max-width: 500px; /* Adjust the max-width as needed */
  height: auto;
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


:deep([type='text']:focus) {
  border-color: transparent !important;
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


.register-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
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

.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.register-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-register-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.register-code-img {
  height: 40px;
  padding-left: 12px;
}

.login-btn {
}
</style>

