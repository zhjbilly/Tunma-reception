import {ElNotification, ElMessageBox, ElMessage} from 'element-plus'
import nprogress from "nprogress"

const baseUrl = import.meta.env.VITE_APP_BASE_API;

export function notification(message, type = 'success', dangerouslyUseHTMLString = false) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}

export function showModel(content = '提示内容', type = 'warning', title = '') {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type,
        }
    )
}

export function showMessage(message = '提示内容', type = 'success', customClass = '') {
    return ElMessage({
        type: type,
        message,
        customClass,
    })
}

export function showPageLoading() {
    nprogress.start()
}

export function hidePageLoading() {
    nprogress.done()
}


export function getImage(tupian) {
    if (!tupian) return '';
    const images = tupian.split(',');
    const firstImage = images[0].trim();
    return baseUrl + firstImage;
};


export const getImageArray = (tupian) => {
    if (!tupian) return [];
    return tupian.split(',').map(img => `${baseUrl}${img.trim()}`);
};
