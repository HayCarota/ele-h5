import axios from 'axios'
import { showDialog } from 'vant'

const instance = axios.create({
    baseURL: '/api',
})

// 请求响应拦截
instance.interceptors.response.use((response) => {
    const {data: _data} = response
    const {data, code, msg} = _data
    console.log(111,code)

    if(code !== 0) {
        showDialog({
            message: msg || '请求失败'
        }).then(() => {
            // 关闭弹窗的逻辑
        })
        return Promise.reject(msg)
    }
    return data
})
export default instance