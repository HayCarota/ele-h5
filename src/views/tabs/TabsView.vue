<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
// import { Tabbar, TabbarItem } from 'vant'
import { ref, watch } from 'vue'

const route = useRoute(); // 1、当前路由状态hook
const router = useRouter(); // 2、获取路由实例hook
//记录当前选择的 tab
const active = ref(route.name as string)

//3、监听路由变化，更新选中的 tab
watch(active, (newActive) => {
    router.push({ name: newActive })
})

</script>

<template>
  <!-- <div class="center">{{ active }}</div> -->
  <!-- 内容渲染地方 路由出口 -->
  <RouterView />
  <VanTabbar v-model="active">
    <VanTabbarItem name="home" icon="home-o">首页</VanTabbarItem>
    <VanTabbarItem name="order" icon="bars">订单</VanTabbarItem>
    <VanTabbarItem name="me" icon="contact">我的</VanTabbarItem>
  </VanTabbar>
</template>

<style>
.center {
  text-align: center;
}
</style>
