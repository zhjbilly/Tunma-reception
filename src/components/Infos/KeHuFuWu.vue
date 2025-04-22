<script setup>
import { ref, nextTick, defineComponent } from 'vue'

// 组件名称
defineComponent({
  name: 'KeHuFuWu'
})

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  initialMessages: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const inputMessage = ref('')
const messagesRef = ref(null)
const messages = ref(props.initialMessages)
const userAvatar = 'https://picsum.photos/50/50?random=20'
const serviceAvatar = 'https://picsum.photos/50/50?random=10'

// 模拟客服自动回复
const autoReply = async () => {
  const replies = [
    '好的，我明白了，请问还有什么可以帮您的吗？',
    '这个问题我来为您解答...',
    '您说得对，关于这一点我补充说明一下...',
    '需要我为您详细介绍产品的具体参数吗？',
    '如果您对价格有疑问，我可以为您详细说明...'
  ]
  
  setTimeout(() => {
    messages.value.push({
      type: 'service',
      content: replies[Math.floor(Math.random() * replies.length)],
      avatar: serviceAvatar
    })
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }, 1000)
}

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return
  
  messages.value.push({
    type: 'user',
    content: inputMessage.value,
    avatar: userAvatar
  })
  
  inputMessage.value = ''
  
  await nextTick()
  messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  
  // 触发自动回复
  autoReply()
}
</script>

<template>
  <el-dialog
    title="在线客服"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    width="40%"
  >
    <div class="kefu-container">
      <div class="kefu-messages" ref="messagesRef">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.type]"
        >
          <el-avatar :size="30" :src="message.avatar" />
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>
      
      <div class="kefu-input">
        <el-input
          v-model="inputMessage"
          placeholder="请输入消息"
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

<style scoped>
.kefu-container {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.kefu-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 10px;
}

.message.service {
  flex-direction: row;
}

.message.user {
  flex-direction: row-reverse;
}

.message-content {
  background: #f4f4f5;
  padding: 10px;
  border-radius: 4px;
  max-width: 70%;
}

.kefu-input {
  padding: 20px;
  border-top: 1px solid #eee;
}
</style> 