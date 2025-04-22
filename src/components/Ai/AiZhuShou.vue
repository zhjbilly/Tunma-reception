<template>
  <!-- AI助手悬浮按钮 -->
  <div class="ai-assistant">
    <el-button
      class="ai-button"
      type="primary"
      circle
      size="large"
      @click="showDialog = true"
    >
      <el-icon><ChatDotRound /></el-icon>
    </el-button>
  </div>

  <!-- AI对话框 -->
  <el-dialog
    v-model="showDialog"
    title="智能购物助手"
    width="600px"
    class="ai-dialog"
  >
    <div class="chat-container">
      <div class="chat-messages" ref="messagesRef">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="message"
          :class="message.type"
        >
          <div class="message-avatar">
            <el-avatar 
              :size="40"
              :src="message.type === 'ai' ? aiAvatar : userAvatar"
            />
          </div>
          <div class="message-content">
            <div class="message-text">{{ message.content }}</div>
            <div class="message-time">{{ message.time }}</div>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <el-input
          v-model="inputMessage"
          placeholder="请输入您的问题..."
          :suffix-icon="Position"
          @keyup.enter="sendMessage"
        >
          <template #append>
            <el-button @click="sendMessage">发送</el-button>
          </template>
        </el-input>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { ChatDotRound, Position } from '@element-plus/icons-vue'

const showDialog = ref(false)
const inputMessage = ref('')
const messagesRef = ref(null)

// 头像
const aiAvatar = 'https://picsum.photos/40/40?random=1'
const userAvatar = 'https://picsum.photos/40/40?random=2'

// 聊天记录
const messages = ref([
  {
    type: 'ai',
    content: '您好！我是您的智能购物助手，有什么可以帮您的吗？',
    time: '09:00'
  }
])

// 发送消息
const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  messages.value.push({
    type: 'user',
    content: inputMessage.value,
    time: new Date().toLocaleTimeString('zh-CN', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })
  })

  inputMessage.value = ''

  await nextTick()
  messagesRef.value.scrollTop = messagesRef.value.scrollHeight

  setTimeout(() => {
    messages.value.push({
      type: 'ai',
      content: '我明白了，让我为您推荐一些相关商品...',
      time: new Date().toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
    })
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }, 1000)
}
</script>

<style scoped>
/* AI助手悬浮按钮 */
.ai-assistant {
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 999;
}

.ai-button {
  width: 60px;
  height: 60px;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
}

.ai-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* 对话框样式 */
.chat-container {
  height: 600px;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.message.user {
  flex-direction: row-reverse;
}

.message-content {
  max-width: 80%;
}

.message-text {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.message.ai .message-text {
  background-color: #f4f4f5;
  color: #303133;
}

.message.user .message-text {
  background-color: #409eff;
  color: #fff;
}

.message-time {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
  text-align: right;
}

.chat-input {
  padding: 20px;
  border-top: 1px solid #eee;
}

/* 自定义滚动条 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-track {
  background-color: #f5f7fa;
}

/* 对话框动画 */
.el-dialog {
  transition: all 0.3s;
}

.el-dialog__wrapper {
  transition: opacity 0.3s;
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .ai-assistant {
    right: 20px;
    bottom: 20px;
  }

  .ai-button {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  .el-dialog {
    width: 95% !important;
    margin: 5vh auto !important;
  }
  
  .chat-container {
    height: 70vh;
  }
}
</style> 