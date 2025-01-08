import type {baseResponse} from "@/api/index";
import type {optionType} from "@/types";
import {useAxios} from "@/api/index";

export function tagOptionsApi():Promise<baseResponse<optionType[]>>{
    return useAxios.get("/api/tag_names")
}