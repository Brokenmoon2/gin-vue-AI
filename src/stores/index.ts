import {ref, computed} from 'vue'
import {defineStore} from 'pinia'


const theme: boolean = true // true light   false  dark
const collapsed: boolean = false
export const useStore = defineStore('counter', {
    state() {
        return {
            theme: theme,
            collapsed: collapsed, // 后台侧边栏的搜索状态，默认展开
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
