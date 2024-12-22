<template>
  <div class="gvb_admin">
    <aside>
      <div class="gvb_logo">
        <img src="/image/logo.png" alt="">
        <div class="logo_head">
          <div>空无的博客</div>
          <div>kongwu</div>
        </div>
      </div>
      <div class="gvb_menu">
        <a-menu
            @menu-item-click="clickMenu"
            v-model:selected-keys="selectedKeys"
            v-model:open-keys="openKeys"
        >
          <template v-for="item in menuList" :key="item.key">
            <a-menu-item :key="item.name" v-if="item.child?.length === 0">
              {{ item.title }}
              <template #icon>
                <component :is="item.icon"></component>
              </template>
            </a-menu-item>
            <a-sub-menu v-if="item.child?.length!==0 " :key="item.name">
              <template #icon>
                <component :is="item.icon"></component>
              </template>
              <template #title>{{ item.title }}</template>
              <a-menu-item :key="sub.name" v-for="sub in item.child">
                {{ sub.title }}
                <template #icon>
                  <component :is="sub.icon"></component>
                </template>
              </a-menu-item>
            </a-sub-menu>

          </template>
        </a-menu>
      </div>
    </aside>
    <main>
      <div class="gvb_head">
        <div class="gvb_bread_crumbs">
          <a-breadcrumb>
            <a-breadcrumb-item v-for="item in route.matched">{{ (item.meta as MetaType).title }}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="gvb_function_area">
          <IconMenu class="action_icon"></IconMenu>
          <div class="gvb_theme">
            <IconSun class="action_icon"></IconSun>
          </div>
          <div class="gvb_user_info_menu">
            <a-dropdown>
              <div class="gvb_user_info_menu_dropdown">
                <img src="/image/OIP.jpg"
                     alt="">
                <span class="gvb_user_info_menu_dropdown_span">fengfeng</span>
                <IconDown></IconDown>
              </div>
              <template #content>
                <a-doption>Option 1</a-doption>
                <a-doption>Option 3</a-doption>
                <a-doption>Option 4</a-doption>
                <a-doption>Option 5</a-doption>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
      <div class="gvb_tabs">
        <span class="gvb_tab active">首页</span>
        <span class="gvb_tab">用户列表</span>
        <span class="gvb_tab">文章列表</span>
      </div>
      <div class="gvb_container">
        <router-view v-slot="{Component}">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </main>

  </div>
</template>
<script setup lang="ts">
import {
  IconMenu,
  IconSun,
  IconUser,
  IconApps,
  IconBug,
  IconBulb,
  IconDown,
} from '@arco-design/web-vue/es/icon';
import type {Component} from "vue";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import type {RouteMeta} from "vue-router";
import {ref} from "vue";

interface MetaType extends RouteMeta {
  title: string
}

const route = useRoute()
const router = useRouter()

interface MenuType {
  key: string
  title: string
  icon?: Component
  name?: string // 路由名字
  child?: MenuType[]
}


const menuList: MenuType[] = [
  {key: "1", title: "首页", icon: IconMenu, name: "home", child: []},
  {
    key: "2", title: "个人中心", icon: IconUser, name: "user_center", child: [
      {key: "2-1", title: "我的信息", icon: IconUser, name: "user_info"},
    ]
  },
  {
    key: "3", title: "文章管理", icon: IconUser, name: "article", child: [
      {key: "3-1", title: "文章列表", icon: IconUser, name: "article_list"},
    ]
  },
  {
    key: "4", title: "用户管理", icon: IconUser, name: "users", child: [
      {key: "4-1", title: "用户列表", icon: IconUser, name: "user_list"},
    ]
  },
  {
    key: "5", title: "群聊管理", icon: IconUser, name: "chat_group", child: [
      {key: "5-1", title: "聊天记录", icon: IconUser, name: "chat_list"},
    ]
  },
  {
    key: "6", title: "系统管理", icon: IconUser, name: "system", child: [
      {key: "6-1", title: "菜单列表", icon: IconUser, name: "menu_list"},
    ]
  },

]


const selectedKeys = ref([route.name])
const openKeys = ref([route.matched[1].name])

console.log(route.matched)

function clickMenu(name: string) {
  router.push({
    name: name,
  })
}


</script>
<style lang="scss">
.gvb_admin {
  display: flex;
  color: var(--color-text-1);
  height: 100vh;

  aside {
    width: 240px;
    border-right: 1px solid var(--bg);
    height: 100vh;

    .gvb_logo {
      height: 90px;
      display: flex;
      padding: 20px;
      align-items: center;
      border-bottom: 1px solid var(--bg);

      img {
        width: 60px;
        height: 60px;
      }

      .logo_head {
        margin-left: 20px;

        > div:nth-child(1) {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        > div:nth-child(2) {
          font-size: 12px;
        }
      }
    }
  }

  main {
    width: calc(100% - 240px);
    overflow-x: hidden;
    overflow-y: auto;

    .gvb_head {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid var(--bg);
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;

      .gvb_function_area {
        display: flex;
        align-items: center;

        .action_icon {
          margin-right: 10px;
          cursor: pointer;
          font-size: 16px;
        }

        .gvb_user_info_menu {
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }

          .gvb_user_info_menu_dropdown {
            display: flex;
            cursor: pointer;
            align-items: center;

            .gvb_user_info_menu_dropdown_span {
              margin: 0 5px;
            }
          }
        }
      }
    }

    .gvb_tabs {
      height: 30px;
      width: 100%;
      border-bottom: 1px solid var(--bg);
      padding: 0 20px;
      display: flex;
      align-items: center;

      .gvb_tab {
        border-radius: 5px;
        border: 1px solid var(--bg);
        padding: 2px 8px;
        margin-right: 10px;
        cursor: pointer;

        &.active {
          background-color: var(--active);
          color: white;
          border: none;
        }
      }
    }

    .gvb_container {
      background-color: var(--bg);
      min-height: calc(100vh - 90px);
      padding: 20px;
    }

  }
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active {
  transform: translateX(-30px);
  opacity: 0;
}

.fade-enter-to {
  transform: translateX(0px);
  opacity: 1;
}

.fade-leave-active, .fade-enter-active {
  transition: all 0.3s ease-out;
}

</style>