import axios from "axios";
import {getToken} from '@/utils/auth.js'
import errorCode from "@/utils/errorCode.js";
import {ElMessage, ElNotification} from "element-plus";

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 7000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = getToken()
    // 统一添加请求头 Token
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(res =>  {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200;
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode['default']
        // 二进制数据则直接返回
        if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
            return res.data
        }
        if (code === 401) {
            debugger
            const originalUrl = res.config.url;
            if (!originalUrl.includes('/getInfo')) {
                ElMessage({ message: msg, type: 'error' })
                location.href = '/login';
            }
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            ElMessage({ message: msg, type: 'error' })
            return Promise.reject(new Error(msg))
        } else if (code === 601) {
            ElMessage({ message: msg, type: 'warning' })
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            ElNotification.error({ title: msg })
            return Promise.reject('error')
        } else {
            return  Promise.resolve(res.data)
        }
    },
    error => {
        console.log('err' + error)
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
        return Promise.reject(error)
    }
);

// 暴露
export default instance
