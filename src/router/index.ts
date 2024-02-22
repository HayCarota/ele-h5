import { createRouter, createWebHistory } from 'vue-router'
import TabsView from '@/views/tabs/TabsView.vue'
import HomeViewVue from '@/views/tabs/home/HomeView.vue'
import OrderViewVue from '@/views/tabs/order/OrderView.vue'
import MeViewVue from '@/views/tabs/me/MeView.vue'
import LoginViewVue from '@/views/login/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 设置history，就不会带哈希#
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: TabsView,
      children: [
        { name: 'home', path: '/home', component: HomeViewVue },
        { name: 'order', path: '/order', component: OrderViewVue },
        { name: 'me', path: '/me', component: MeViewVue }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: LoginViewVue
    }
  ]
})

// 创建router实例，并导出
export default router
