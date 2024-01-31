import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// vant局部注册引入组件
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

const resolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // Components({ // vant局部注册引入组件
    //   resolvers: [VantResolver()],
    // })
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  //配置反向代理
  server: {
    // 配置前端项目端口
    port: 3000,
    proxy: {
      '/api': 'https://mock.apifox.com/m1/3993911-0-default',
      '/imgs': 'https://mock.apifox.com/m1/3993911-0-default',
      '/one': 'https://api.xygeng.cn/'
    }
  }
})
