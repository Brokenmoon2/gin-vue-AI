import {defineStore} from 'pinia'

export interface userInfoType {
    nick_name: string
    role: number // 角色
    user_id: number // 用户id
    avatar: string
    token: string
}

const theme: boolean = true // true light   false  dark
const collapsed: boolean = false
const userInfo: userInfoType = {
    nick_name: "枫枫",
    role: 0,
    user_id: 0,
    avatar: "https://img1.baidu.com/it/u=2961575590,2057372040&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    token: "",
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
        }
    },
    getters: {
        themeString(): string {
            return this.theme ? "light" : "dark"
        }
    }
})
