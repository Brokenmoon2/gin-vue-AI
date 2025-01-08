import type {baseResponse, listDataType, paramsType} from "@/api/index";
import {useAxios} from "@/api/index";
import type {optionType} from "@/types";

export interface articleType {
    abstract: string
    banner_id: number
    banner_url: string
    category: string
    collects_count: number
    comment_count: number
    created_at: string
    digg_count: number
    id: string
    link: string
    look_count: number
    source: string
    tags: string[]
    title: string
    updated_at: string
    user_avatar: string
    user_id: number
    user_nick_name: string
}

export function articleListApi(params: paramsType): Promise<baseResponse<listDataType<articleType>>> {
    return useAxios.get("/api/articles", {params: params})
}


export function articleCategoryList():Promise<baseResponse<optionType[]>>{
    return useAxios.get("/api/categorys")
}