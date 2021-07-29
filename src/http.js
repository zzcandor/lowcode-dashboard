/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from './router'
import store from './store'

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/',
        query: {
            redirect: router.currentRoute.fullPath,
        },
    })
}

// 创建axios实例
const instance = axios.create({
    timeout: 1000 * 10,
})

// 请求地址
instance.defaults.baseURL = 'http://localhost:3000'

// // 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
    // 每次请求附加一个token
        if (!config.url.includes('/user/')) {
            const token = store.getters.userInfo?.token
            if (token) {
                config.headers.Authorization = token
            } else {
                toLogin()
                return Promise.resolve()
            }
        }
        return config
    },
    error => Promise.error(error),
)

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    (res) => {
        if (res.status === 200) {
            return Promise.resolve(res)
        } if (res.status === 401) {
            toLogin()
            return Promise.reject(res)
        }
        return Promise.reject(res)
    },
    // 请求失败
    error => Promise.reject(error.response),
)

export default instance
