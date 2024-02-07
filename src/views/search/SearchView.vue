<script setup lang="ts">
import OpSearch from '@/components/OpSearch.vue'
import { ref } from 'vue'
import { fetchSearchData } from '@/api/search'
import type { ISearchResult } from '@/types'
import { useToggle } from '@/use/useToggle'
import { computed } from 'vue'
import { watch } from 'vue'
import { useDebounce } from '@/use/useDebounce'
//  声明事件接口，接口中属性值是一个函数，函数名是cancel，返回值是一个函数void
interface IEmits {
  (e: 'cancel'): void
}

const searchValue = ref('')
const searchResult = ref([] as ISearchResult[])

// 定义一个事件变量，用defineEmits方法实现，方法中引入声明的事件接口
const emits = defineEmits<IEmits>()

const HISTORY_TAGS = [
  '披萨',
  '标签2',
  '标签3',
  '标签4',
  '标签5',
  '标签6',
  '标签7',
]
const [isHistoryTagShown, toggleHistoryTag] = useToggle(false)
const historyTags = computed(() => (isHistoryTagShown.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0, 5)))

// 有三种状态：搜索初始化、搜索完成、搜索中
const [INIT, DONE, DOING] = [-1, 0, 1]
const searchState = ref(INIT)

const onSearch = async (v?: string | number) => {
  console.log('onSearch', v)
  // 防止搜索状态错误
  try {
    searchState.value = DOING
    const { list } = await fetchSearchData(v as string)
    searchResult.value = list
  } finally {
    searchState.value = DONE
  }
}
const onTagClick = (v:string) => {
    searchValue.value = v
    onSearch(v)
}

// // 会报没有与此调用匹配的重载。 最后一个重载给出了以下错误。其实是watch 实际有三个参数， 把泛型去掉，做一个断言
// watch(searchValue, useDebounce((new_v) => {
//     if(!new_v) {
//         searchResult.value = []
//         return
//     }
//     onSearch(new_v as string)
// }, 1000))

const debounceValue = useDebounce(searchValue, 1000)
watch(debounceValue, (new_v) => {
    if(!new_v) {
        searchResult.value = []
        return
    }
    onSearch(new_v as string)
})
</script>

<template>
  <!-- 调用事件变量，传入事件名cancel // 模板代码中引入定义的事件，用来在父组件中使用对应的事件 -->
  <div class="search-view">
    <OpSearch
      show-action
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="emits('cancel')"
    />
    <div v-if="!searchValue" class="search-view__history">
      <div class="label">历史搜索</div>

      <TransitionGroup name="list">
        <div class="history-tag" v-for="v in historyTags" :key="v" @click="onTagClick(v)">{{ v }}</div>
        <div class="history-tag" key="arrow" @click="toggleHistoryTag">
          <VanIcon v-if="isHistoryTagShown" name="arrow-up"></VanIcon>
          <VanIcon v-else name="arrow-down"></VanIcon>
        </div>
      </TransitionGroup>
    </div>
    <div v-else class="search-view__result">
      <div class="searching" v-if="searchState === DOING">~正在搜索</div>
      <template v-if="searchState === DONE">
        <div class="result-item" v-for="v in searchResult" :key="v.label">
          <VanIcon name="search"></VanIcon>
          <div class="name">{{ v.label }}</div>
          <div class="count">约{{ v.resultCount }}个结果</div>
        </div>
        <!-- 搜索结果状态维护 -->
        <div class="no-result" v-if="!searchResult.length">~暂无推荐</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.search-view {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  z-index: 999;
  &__history {
    padding: var(--van-padding-sm);
    .label {
      margin-bottom: var(--van-padding-xs);
    }
    .history-tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 10px;
      color: var(--van-gray-6);
      background: var(--van-gray-1);
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);
    }
  }
  &__result {
    .result-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 10px;
      border-radius: 1px solid var(--van-gray-1);
      .name {
        // 撑满满足padding的一行
        flex: 1;
        padding-left: 6px;
      }
      .count {
        font-size: 12px;
        color: var(--van-gray-6);
      }
    }
    .no-result, .searching {
        font-size: 12px;
        padding: 100px 0;
        text-align: center;
        color: var(--van-gray-6)
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
