import axios from "@/utils/request.js"

export function login(username, password, code, uuid,role) {
    const data = {
        username,
        password,
        code,
        uuid,
        role
    }
    return axios({
        url: '/login',
        headers: {
            isToken: false,
            repeatSubmit: false
        },
        method: 'post',
        data: data
    })
}

// 注册方法
export function register(data) {
    return axios({
        url: '/register',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

// 获取用户详细信息
export function getInfo() {
    return axios({
        url: '/getInfo',
        method: 'get'
    })
}

// 退出方法
export function logout() {
    return axios({
        url: '/logout',
        method: 'post'
    })
}

// 获取验证码
export function getCodeImg() {
    return axios({
        url: '/captchaImage',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })
}
export function getUserProfile() {
    return axios({
        url: '/system/user/profile/getInfo',
        method: 'get'
    })
}

// 充值
export function chongzhi(jine) {
    return axios({
        url: '/system/user/profile/chongzhi/'+jine,
        method: 'put',
    })
}

// 修改用户信息
export function editUser(data) {
    return axios({
        url: '/system/user/profile',
        method: 'put',
        data: data
    })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
    const data = {
        oldPassword,
        newPassword
    }
    return axios({
        url: '/dongwu/user/updatePwd',
        method: 'put',
        params: data
    })
}

export function getRoles() {
    return axios({
        url: '/common/roleList',
        method: 'get'
    })
}


