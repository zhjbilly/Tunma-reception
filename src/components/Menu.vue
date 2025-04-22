<template>
  <div class="menu-container">
    <div class="system-title">
      沈绣博物馆藏品与文化遗产档案管理信息系统
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-horizontal"
      mode="horizontal"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      @select="handleSelect"
    >
      <!-- 藏品分类一级菜单 -->
      <el-menu-item
        v-for="item in fenleiList"
        :key="item.id"
        :index="'fenlei-' + item.id"
      >
        <el-icon><Collection /></el-icon>
        <template #title>{{ item.fenleiMingcheng }}</template>
      </el-menu-item>
    </el-menu>
  </div>

  <!-- 修改密码对话框 -->
  <el-dialog
      title="修改密码"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
  >
    <el-form :model="passwordForm" :rules="rules" ref="passwordFormRef" label-width="100px">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="passwordForm.oldPassword" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordForm.newPassword" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="passwordForm.confirmPassword" type="password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="js" setup>
import {useRouter} from 'vue-router';
import {onMounted, onUnmounted, ref} from 'vue';
import router from "@/router/index.js";
import useUserStore from '@/store/modules/user'
import {updateUserPwd} from "@/api/user.js";
import {Bell, HomeFilled, User, Collection} from "@element-plus/icons-vue";
import {ElNotification} from "element-plus";
import MessageNotification from './MessageNotification/index.vue';
import { getFenleiList } from '@/api/cangpin'

const userStore = useUserStore()
const $router = useRouter();
const userAvatar = ref('/src/assets/images/profile.jpg'); // 默认头像
const fenleiList = ref([])
const activeIndex = ref('1')

// 获取藏品分类列表
const getFenleiData = async () => {
  try {
    const res = await getFenleiList({
      pageNum: 1,
      pageSize: 100
    })
    if (res.code === 200) {
      fenleiList.value = res.rows
    }
  } catch (error) {
    console.error('获取分类列表失败:', error)
  }
}

const handleSelect = (key) => {
  if (key === '1') {
    router.push('/')
  } else if (key.startsWith('fenlei-')) {
    const fenleiId = key.split('-')[1]
    console.log('选择了分类ID:', fenleiId)
    router.replace({
      path: '/',
      query: {
        fenleiId: fenleiId
      }
    })
  } else if (key === '3') {
    router.push('/profile')
  }
}



onMounted(() => {
  getFenleiData()
})

const toIndex = () => {
  $router.push('/');
};

const toGonggao = () => {
  $router.push('/gonggao');
};

const toWodes = () => {
  router.push({path: '/wodes', query: {activeTab: 'wode'}});
};

const toWupinzhaoling = () => {
  $router.push('/wupinzhaoling');
};

const toWupinguashj = () => {
  $router.push('/wupinguashi');
};

const openProfile = (event) => {
  event.stopPropagation(); // 阻止事件冒泡，防止触发下拉菜单
};

const viewProfile = () => {
  router.push({path: '/wodes', query: {activeTab: 'wode'}});
};

// 修改密码
const dialogVisible = ref(false);

const showChangePasswordDialog = () => {
  userStore.getInfo()
  dialogVisible.value = true;
};

const handleClose = (done) => {
  dialogVisible.value = false;
  done();
};

const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== passwordForm.value.newPassword) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const rules = ref({
  oldPassword: [
    {required: true, message: '请输入原密码', trigger: 'blur'}
  ],
  newPassword: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
  ],
  confirmPassword: [
    {required: true, message: '请再次输入新密码', trigger: 'blur'},
    {validator: validateConfirmPassword, trigger: 'blur'}
  ]
});

const passwordFormRef = ref(null);

const submitForm = () => {
  passwordFormRef.value.validate((valid) => {
    if (valid) {
      updateUserPwd(passwordForm.value.oldPassword, passwordForm.value.newPassword).then((res) => {
        if (res.code === 200) {
          dialogVisible.value = false;
          logout();
        } else {
          alert('修改密码失败');
        }
      });
    } else {
      console.log('表单验证失败');
      return false;
    }
  });
};

const logout = () => {
  // 退出登录的逻辑
  userStore.logOut().then(() => {
    $router.push('/login');
  });
};

// WebSocket连接
const socket = ref(null);

// 初始化WebSocket
const initWebSocket = () => {
  socket.value = new WebSocket('ws://127.0.0.1:8080/webSocket'); // 替换为你的WebSocket地址

  socket.value.onopen = () => {
    console.log('WebSocket连接已建立');
  };

  socket.value.onmessage = (event) => {
    const message = event.data;
    console.log('收到通知:', message);
    showNotification(message); // 处理通知
  };

  socket.value.onclose = () => {
    console.log('WebSocket连接已关闭');
  };

  socket.value.onerror = (error) => {
    console.error('WebSocket错误:', error);
  };
};

// 显示通知
const showNotification = (message) => {
  ElNotification({
    title: '公告通知',
    message: message,
    type: 'success', // 通知类型：success/warning/info/error
    duration: 5000, // 5 秒后自动关闭
  });
};

// 组件卸载时关闭WebSocket
onUnmounted(() => {
  if (socket.value) {
    socket.value.close();
  }
});

const showNotifications = () => {
  // 在这里处理点击事件，例如显示通知列表
  console.log('点击了通知铃铛');
};

</script>

<style scoped>
.menu-container {
  position: relative;
  background-color: #304156;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}

.system-title {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  padding: 0 20px;
  white-space: nowrap;
  letter-spacing: 1px;
  flex-shrink: 0;
}

.el-menu-horizontal {
  display: flex;
  justify-content: flex-start;
  border-bottom: none;
  background-color: transparent !important;
  flex: 1;
}

.el-menu-horizontal .el-menu-item {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  border-bottom: 2px solid transparent;
}

.el-menu-horizontal .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.el-menu-horizontal .el-menu-item.is-active {
  border-bottom: 2px solid #409EFF;
  background-color: rgba(64, 158, 255, 0.1) !important;
}

.el-menu-horizontal .el-menu-item .el-icon {
  margin-right: 5px;
  font-size: 18px;
}

@media screen and (max-width: 1200px) {
  .menu-container {
    padding: 0 10px;
  }

  .system-title {
    font-size: 16px;
    padding: 0 10px;
  }

  .el-menu-horizontal .el-menu-item {
    padding: 0 15px;
  }
}

@media screen and (max-width: 768px) {
  .menu-container {
    flex-direction: column;
    padding: 10px;
  }

  .system-title {
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
  }

  .el-menu-horizontal {
    width: 100%;
    justify-content: center;
  }
}
</style>
