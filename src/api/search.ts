import axios from "./base";
import type { ISearchResultList } from "@/types";

export function fetchSearchData(key = ''){
    // 需要定义两个
    return axios.get<ISearchResultList, ISearchResultList>('home_search', {
        params: {
            _label_like: key, // 模糊搜索
        }
    })
}