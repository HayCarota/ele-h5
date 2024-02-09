// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vant/lib/index.css'
import './assets/common.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 全局注册引入组件
import { Tabbar, TabbarItem, Search, Icon, Loading, Skeleton } from 'vant'
app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(Icon)
app.use(Loading)
app.use(Skeleton)

const rootValue = 16
const rootWidth = 390
const deviceWidth = document.documentElement.clientWidth // 获取用户设备屏幕宽度
document.documentElement.style.fontSize = deviceWidth * rootValue / rootWidth + 'px' // 动态获取用户设备的屏幕宽度

app.mount('#app')
