import '@/assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import plugins from './plugins' // plugins
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/ruoyi'
import Pagination from '@/components/Pagination/index.vue'

import 'element-plus/dist/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js';
import directive from './directive' // directive
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 字典标签组件
import DictTag from '@/components/DictTag/index.vue'
// 图片预览组件
import ImagePreview from "@/components/ImagePreview/index.vue"
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar/index.vue'
// 图片上传组件
import ImageUpload from "@/components/ImageUpload/index.vue"
// 富文本组件
import Editor from "@/components/Editor/index.vue"


import { useDict } from '@/utils/dict'
const app = createApp(App)
app.config.globalProperties.useDict = useDict
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

app.component('DictTag', DictTag)
app.component('Pagination', Pagination)
app.component('RightToolbar', RightToolbar)
app.component('ImagePreview', ImagePreview)
app.component('Editor', Editor)
app.component('ImageUpload', ImageUpload)
app.use(router)
app.use(store)
app.use(plugins)
directive(app)
app.use(ElementPlus,{ locale: zhCn })
// 注册所有 Element Plus 图标
Object.keys(ElementPlusIconsVue).forEach((key) => {
    app.component(key, ElementPlusIconsVue[key]);
});
app.mount('#app')
