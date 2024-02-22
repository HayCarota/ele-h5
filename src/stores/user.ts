import type { IUserInfo } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface IUserState {
    userInfo: IUserInfo
    token: string
}

const getDefaultUserInfo: () => IUserInfo = () => ({
    id: '',
    avatar: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
    nickname: '请登录'
})

export const useUserStore = defineStore('user', ()=> {
    const state = ref({
        userInfo: getDefaultUserInfo(),
        token: ''
    })
    const getUserInfo = computed(()=> {
        return state.value.userInfo
    })
    const setInfo = ({token, userInfo}: IUserState) => {
        state.value.userInfo = userInfo
        state.value.token = token
    }
    const removeInfo = () => {
        state.value.userInfo = getDefaultUserInfo()
        state.value.token = ''
    }
    return {
        state,
        getUserInfo,
        setInfo,
        removeInfo
    }
})