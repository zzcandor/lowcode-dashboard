import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('./views/Index.vue'),
            meta: {
                title: '低代码大屏 | 一站式数据大屏制作平台',
            },
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('./views/Home/Index.vue'),
            meta: {
                title: '低代码大屏 | 一站式数据大屏制作平台',
            },
        },
        {
            path: '/edit',
            component: () => import('./components/Editor/Index.vue'),
            children: [
                {
                    path: ':id',
                    component: () => import('./views/Editor/Canvas.vue'),
                    meta: {
                        title: '大屏编辑',
                    },
                },
            ],
        },
        {
            path: '/view/:id',
            name: 'view',
            component: () => import('./views/Viewer/Canvas.vue'),
            meta: {
                title: '大屏查看 | 低代码大屏',
            },
        },
    ],
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router
