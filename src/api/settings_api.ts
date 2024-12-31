import type {baseResponse, listDataType} from "@/api/index";
import {useAxios} from "@/api/index";


export interface siteInfoType {
    addr: string
    bei_an: string
    bilibili_url: string
    created_at: string
    email: string
    gitee_url: string
    github_url: string
    job: string
    name: string
    qq_image: string
    slogan: string
    slogan_en: string
    title: string
    version: string
    web: string
    wechat_image: string
}

export function siteInfoApi(): Promise<baseResponse<listDataType<siteInfoType>>> {
    return useAxios.get("/api/settings/site")
}


export function siteInfoUpdateApi(data: siteInfoType): Promise<baseResponse<string>> {
    return useAxios.put("/api/settings/site", data)
}