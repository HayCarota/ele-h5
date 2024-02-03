import { type Ref, ref } from "vue";

//useToggle是一个hooks， hooks 就是将去改变一个属性值时，页面也会更新对应的值的想法 抽象用代码实现的地方
export function useToggle(initState: boolean): [Ref<boolean>, () => void] {
    const state = ref(initState); // 接收组件传递的属性值，这里定义为一个布尔值
    const toggle = function() {
        state.value = !state.value; // toggle方法是该hooks实现搜索页切换的代码逻辑地方
    }
    return [state, toggle]
}