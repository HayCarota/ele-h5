import { inject, type InjectionKey, getCurrentInstance, onUnmounted } from "vue";
import type {Child} from './useChildren'

export type ParentProvide<T> = T & {
    link(instance: Child): void
    unlink(instance: Child): void
    [key:string]: any
}

export function useParent<T>(key: InjectionKey<ParentProvide<T>>){
    const parent = inject(key, null)

    if(!parent){
        return {
            parent: null,
        }
    }

    const instance = getCurrentInstance()
    const { link, unlink } = parent
    link(instance)
    onUnmounted(() => unlink(instance))

    return {
        parent,
    }
}