<script setup lang="ts">
import { useToggle } from '@/use/useToggle'
import TheTop from './components/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'
import type { ICountdown, IHomeInfo } from '@/types'
import OpLoadingView from '@/components/OpLoadingView.vue'
import ScrollBar from './components/ScrollBar.vue'
import TheTransformer from './components/TheTransformer.vue'


const recomments = [
  { value: 1, label: '牛腩' },
  { value: 2, label: '红烧肉' },
  { value: 3, label: '宫保鸡丁' }
]

// 实现事件传递实现跨组件通信, 流程是先创建一个hooks 用来进行参数传递，在 父组件HomeView中 针对子组件 searchView 和 子组件theTop中的 子组件 opSearch 进行跨组件通信
const [isSearchViewShown, toggleSearchView] = useToggle(false)

const { data, pending } = useAsync(fetchHomePageData, {
  banner: [],
  searchRecomments: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: {} as ICountdown,
  activities: []
} as IHomeInfo)
</script>

<template>
  <div class="home-page">
    <!-- 动画组件使用方法 -->
    <Transition name="fade">
      <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <div v-show="!isSearchViewShown">
      <TheTop :recomments="data.searchRecomments" @searchClick="toggleSearchView" />
      <OpLoadingView :loading="pending" type="skeleton">
        <!-- 组件中slot插槽模板使用方法 <template #template>
          <div>加载中</div>
        </template> -->
        <div class="home-page__banner">
          <img v-for="v in data.banner" :key="v.imgUrl" :src="`src/assets/api${v.imgUrl}`" />
        </div>
        <TheTransformer :data="data.transformer" />
        <ScrollBar :data="data.scrollBarInfoList" />
      </OpLoadingView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 动画执行效果，消失效果
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
// 动画进行时状态效果
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.home-page {
  background: var(--op-gray-bg-color);
  padding-bottom: 70px;

  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: white;
    }
  }
  &__activity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    &__swipe {
      border-radius: 8px;
      width: 180px;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
