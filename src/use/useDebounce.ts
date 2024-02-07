// interface IDebounceFn<T> {
//     (...args: T[]): void | Promise<void>;
// }

// export function useDebounce<T>(fn: IDebounceFn<T>, delay: number) {
//     let timer: number | null = null
//     return function f(this: void, ...args: T[]) {
//         if(timer){
//             clearTimeout(timer)
//         }
//         timer = setTimeout(() => {
//             fn.call(this, ...args)
//         },delay)
//     }
// }

import { ref, watch, type Ref, type UnwrapRef, onUnmounted } from 'vue'

// hooks 和工具类，方法真正区别，是有没有用的ref，或者像computed一些计算属性，会去改页面属性值的时候才会变成一个hooks
export function useDebounce<T>(value: Ref<T>, delay: number) {
  const debounceValue = ref(value.value)
  let timer: number | null = null
  
  console.log(debounceValue,timer)
  const unwatch = watch(value, (new_v) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      debounceValue.value = new_v as UnwrapRef<T>
    }, delay)
  })

  onUnmounted(() => {
    unwatch()
  })

  return debounceValue
}
