import { useLocalStorage } from '@/use/useLocalStorage'
import axios from 'axios'
import { showDialog } from 'vant'

const instance = axios.create({
    baseURL: '/api',
})

instance.interceptors.request.use((config) => {
    const {value: token} = useLocalStorage('token', '')
    if(config.headers && token.value) {
        config.headers['x-token'] = token.value
    }
    return config
})

// 请求响应拦截
instance.interceptors.response.use((response) => {
    const {data: _data} = response
    const {data, code, msg} = _data

    if(code !== 0) {
        showDialog({
            message: msg || '请求失败'
        }).then(() => {
            // 关闭弹窗的逻辑
        })
        return Promise.reject(msg)
    }
    return data
}, (error) =>{
    if(error.response && error.response.status === 401){
        showDialog({
            message: '请登录'
        }).then(() =>{
            // 关闭弹窗的逻辑
        })
    }
})
export default instance