import type {baseResponse, listDataType, paramsType} from "@/api/index";
import {useAxios} from "@/api/index";

export interface chatType {
    addr: string
    avatar: string
    content: string
    created_at: string
    id: number
    ip: string
    is_group: boolean
    msg_type: number  // 1 系统消息-进入聊天室 2 文本消息  7 系统消息-离开聊天室
    nick_name: string


    isMe: boolean
}


export function chatRecordApi(params: paramsType): Promise<baseResponse<listDataType<chatType>>> {
    return useAxios.get("/api/chat_groups_records", {params})
}