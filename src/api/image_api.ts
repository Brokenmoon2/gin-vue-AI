import {useAxios} from "@/api/index";
import type {baseResponse, listDataType, paramsType} from "@/api/index";

export interface imageIdType {
    id: number
    path: string
    name: string
}


export function imageIdListApi(): Promise<baseResponse<imageIdType[]>> {
    return useAxios.get("/api/image_names")
}

export interface imageType {
    id: number
    created_at: string
    path: string
    hash: string
    name: string
    image_type: "本地" | "七牛云",
    bannerCount: number // 关联banner的个数
    articleCount: number // 关联文章的个数
}

export function imageListApi(params: paramsType): Promise<baseResponse<listDataType<imageType>>> {
    return useAxios.get("/api/images", {params: params})
}

export interface imagesUploadResponse {
    file_name: string
    is_success: boolean
    msg: string
}

export function uploadImageApi(file: File): Promise<baseResponse<string>> {
    return new Promise((resolve, reject) => {
        const form = new FormData()
        form.set("image", file)
        useAxios.post("/api/image", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((res:any) => resolve(res)).catch(err => reject(err))
    })
}
