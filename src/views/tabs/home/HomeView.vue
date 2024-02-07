<script setup lang="ts">
import { useToggle } from '@/use/useToggle';
import TheTop from './components/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useAsync } from '@/use/useAsync';
import { fetchHomePageData } from '@/api/home';
import type { IHomeInfo } from '@/types';
import OpLoadingView from '@/components/OpLoadingView.vue';

const recomments = [
  { value: 1, label: '牛腩' },
  { value: 2, label: '红烧肉' },
  { value: 3, label: '宫保鸡丁' }
]

// 实现事件传递实现跨组件通信, 流程是先创建一个hooks 用来进行参数传递，在 父组件HomeView中 针对子组件 searchView 和 子组件theTop中的 子组件 opSearch 进行跨组件通信
const [isSearchViewShown, toggleSearchView] = useToggle(false)

const {data, pending} = useAsync(fetchHomePageData, {} as IHomeInfo, true)
</script>

<template>
  <div class="home-page">
    <!-- 动画组件使用方法 -->
    <Transition name="fade">
      <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <TheTop :recomments="recomments" @searchClick="toggleSearchView"/>
    <OpLoadingView :loading="pending" type="skeleton">
      <!-- 组件中slot插槽模板使用方法 <template #template>
        <div>加载中</div>
      </template> -->
      <div>
        {{ data }}
      </div>
    </OpLoadingView>
  </div>
</template>

<style lang="scss">
// 动画执行效果，消失效果
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
// 动画进行时状态效果
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
