import { useCookies } from '@vueuse/integrations/useCookies'

const TOKEN_KEY = 'Authorization'
const cookie = useCookies()

// 获取 Token
export function getToken() {
    return cookie.get(TOKEN_KEY)
}

// 设置 Token
export function setToken(token) {
    return cookie.set(TOKEN_KEY, token)
}

// 删除 Token
export function removeToken() {
    return cookie.remove(TOKEN_KEY)
}

export function setCookie(key, value) {
    return cookie.set(key, value)
}
export function removeCookie(key) {
    return cookie.remove(key)
}
