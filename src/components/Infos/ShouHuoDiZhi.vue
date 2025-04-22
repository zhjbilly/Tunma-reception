<script>
export default {
  name: 'ShouHuoDiZhi'
}
</script>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  addresses: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const selectedAddress = ref(null)
const showAddForm = ref(false)
const formRef = ref(null)

const newAddress = reactive({
  name: '',
  phone: '',
  province: '',
  city: '',
  detail: ''
})

const rules = {
  name: [{ required: true, message: '请输入收货人姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  province: [{ required: true, message: '请输入省份', trigger: 'blur' }],
  city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
  detail: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
}

const handleConfirm = () => {
  if (!selectedAddress.value) {
    ElMessage.warning('请选择收货地址')
    return
  }
  emit('confirm', props.addresses.find(a => a.id === selectedAddress.value))
}

const handleAddAddress = () => {
  showAddForm.value = true
}

const submitNewAddress = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      const newId = props.addresses.length + 1
      const newAddressObj = {
        id: newId,
        ...newAddress
      }
      const newAddresses = [...props.addresses, newAddressObj]
      emit('update:modelValue', false)
      emit('confirm', newAddressObj)
      ElMessage.success('添加地址成功')
      
      // 重置表单
      Object.keys(newAddress).forEach(key => {
        newAddress[key] = ''
      })
    }
  })
}
</script>

<template>
  <el-dialog
    title="选择收货地址"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    width="50%"
  >
    <div class="dizhi-list">
      <el-card
        v-for="address in addresses"
        :key="address.id"
        :class="['dizhi-item', { active: selectedAddress === address.id }]"
        @click="selectedAddress = address.id"
      >
        <div class="dizhi-header">
          <span class="name">{{ address.name }}</span>
          <span class="phone">{{ address.phone }}</span>
        </div>
        <div class="dizhi-content">
          {{ address.province }}{{ address.city }}{{ address.detail }}
        </div>
      </el-card>
      
      <el-card class="dizhi-item add-dizhi" @click="handleAddAddress">
        <el-icon class="add-icon"><Plus /></el-icon>
        <div>添加新地址</div>
      </el-card>
    </div>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:modelValue', false)">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确认支付
        </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 新增地址表单对话框 -->
  <el-dialog
    v-model="showAddForm"
    title="新增收货地址"
    width="40%"
  >
    <el-form :model="newAddress" :rules="rules" ref="formRef">
      <el-form-item label="收货人" prop="name">
        <el-input v-model="newAddress.name" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="newAddress.phone" />
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <el-input v-model="newAddress.province" />
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input v-model="newAddress.city" />
      </el-form-item>
      <el-form-item label="详细地址" prop="detail">
        <el-input v-model="newAddress.detail" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showAddForm = false">取消</el-button>
        <el-button type="primary" @click="submitNewAddress">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.dizhi-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 10px;
}

.dizhi-item {
  cursor: pointer;
  transition: all 0.3s;
}

.dizhi-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.dizhi-item.active {
  border: 2px solid #409eff;
}

.dizhi-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.name {
  font-weight: bold;
}

.phone {
  color: #666;
}

.dizhi-content {
  color: #666;
  line-height: 1.5;
}

.add-dizhi {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #909399;
}

.add-icon {
  font-size: 24px;
  margin-bottom: 8px;
}
</style> 