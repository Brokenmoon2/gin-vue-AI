import {useAxios} from "@/api/index";
import type {baseResponse} from "@/api/index";

export interface imageIdType {
    id: number
    path: string
    name: string
}


export function imageIdListApi():Promise<baseResponse<imageIdType[]>>{
    return useAxios.get("/api/image_names")
}
