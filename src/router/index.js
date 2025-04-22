import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: import('../views/index.vue')
        },
        {
            path: '/menu',
            name: 'menu',
            component: () => import('../components/menu.vue')
        },
        {
            path: '/wode',
            name: 'wode',
            component: () => import('../views/wode/wode.vue')
        },
        {
            path: '/wodes/:activeTab?',
            name: 'wodes',
            component: () => import('../views/wode/wodes.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue'),
            meta: {layout: 'blank'}, // 添加 meta 字段
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/register.vue'),
            meta: {layout: 'blank'}, // 添加 meta 字段
        },
        {
            path: '/detail/:id',
            name: 'Detail',
            component: () => import('@/views/detail.vue'),
            meta: {
                title: '藏品详情'
            }
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
    }
})

export default router
