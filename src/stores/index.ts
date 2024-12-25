import {defineStore} from 'pinia'
import {parseToken} from "@/utils/jwt";
import {logoutApi} from "@/api/user_api";

export interface userInfoType {
    nick_name: string
    role: number // 角色
    user_id: number // 用户id
    avatar: string
    token: string
    exp: number // 过期时间 需要x1000
}

const theme: boolean = true // true light   false  dark
const collapsed: boolean = false
const userInfo: userInfoType = {
    nick_name: "",
    role: 0,
    user_id: 0,
    avatar: "",
    token: "",
    exp: 0,
}

export const useStore = defineStore('counter', {
    state() {
        return {
            theme: theme,
            collapsed: collapsed, // 后台侧边栏的搜索状态，默认展开
            userInfo: userInfo,
        }
    },
    actions: {
        setTheme(localTheme?: boolean) {
            if (localTheme !== undefined) {
                // 我传了
                this.theme = localTheme
            } else {
                this.theme = !this.theme
            }
            document.documentElement.style.colorScheme = this.themeString
            document.body.setAttribute('arco-theme', this.themeString)

            localStorage.setItem("theme", JSON.stringify(this.theme))
        },
        loadTheme() {
            let val = localStorage.getItem("theme")
            if (val === null) {
                return
            }
            try {
                this.theme = JSON.parse(val)
                this.setTheme(this.theme)
            } catch (e) {
                return;
            }
        },
        setCollapsed(collapsed: boolean) {
            this.collapsed = collapsed
        },
        setToken(token: string) {
            this.userInfo.token = token
            let info = parseToken(token)
            Object.assign(this.userInfo, info)
            localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
        },
        loadToken() {
            let val = localStorage.getItem("userInfo")
            if (val === null) {
                return
            }
            try {
                this.userInfo = JSON.parse(val)
            } catch (e) {
                return;
            }
        },
        async logout() {
            await logoutApi()
            this.userInfo = userInfo
        }
    },
    getters: {
        themeString(): string {
            return this.theme ? "light" : "dark"
        },
        // 是否登录
        isLogin(): boolean {
            return this.userInfo.role !== 0
        },
        // 判断是不是管理员
        isAdmin(): boolean {
            return this.userInfo.role == 1
        },
        // 判断是不是游客
        isTourist(): boolean {
            return this.userInfo.role == 3
        }
    }
})
