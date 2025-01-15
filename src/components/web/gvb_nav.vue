<template>
  <div :class="{gvb_nav: true, isShow: isShow}">
    <div class="gvb_nav_container">
      <div class="left">
        <div class="logo">
          <div class="slogan">枫枫知道</div>
          <div class="en_slogan">FFENGZHIDAO</div>
        </div>
        <div class="nav">
          <template v-for="item in navList">
            <a target="_blank" :href="item.path" v-if="item.path.startsWith('http')"
               :title="item.title">{{ item.title }}</a>
            <router-link :to="item.path" v-else>{{ item.title }}</router-link>
          </template>
        </div>
        <div class="search">
          <IconSearch></IconSearch>
        </div>
      </div>
      <div class="right">
        <div class="login" v-if="!store.isLogin">
          <router-link :to="{name: 'login'}">登录</router-link>
        </div>
        <div class="user_info" v-else>
          <gvb_user_info_menu></gvb_user_info_menu>
        </div>
        <div class="theme">
          <gvb_theme/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IconSearch} from "@arco-design/web-vue/es/icon";
import Gvb_theme from "@/components/common/gvb_theme.vue";
import {useStore} from "@/stores";
import Gvb_user_info_menu from "@/components/common/gvb_user_info_menu.vue";
import {menuNameListApi} from "@/api/menu_api";
import type {menuNameType} from "@/api/menu_api";
import {ref} from "vue";
import {onUnmounted} from "vue";

const store = useStore()

const navList = ref<menuNameType[]>([])


window.addEventListener("scroll", scroll)


const isShow = ref(false)

function scroll() {
  let top = document.documentElement.scrollTop
  if (top >= 200) {
    isShow.value = true
  } else {
    isShow.value = false
  }
}

onUnmounted(() => {
  window.removeEventListener("scroll", scroll)
})


async function getData() {

  const val = sessionStorage.getItem("navList")
  if (val !== null) {
    try {
      navList.value = JSON.parse(val)
      return
    } catch (e) {

    }
  }

  let res = await menuNameListApi()
  navList.value = res.data

  sessionStorage.setItem("navList", JSON.stringify(navList.value))

}

getData()

</script>
<style lang="scss">


.gvb_nav {
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  transition: all .3s;
  color: var(--nav_text_color);

  &.isShow {
    background-color: var(--color-bg-1);
    color: var(--color-text-1);
    a{
      color: var(--color-text-1);
    }
  }

  a {
    text-decoration: none;
    color: var(--nav_text_color);
  }

  .gvb_nav_container {
    width: 1400px;
    height: 60px;
    display: flex;
    align-items: center;

    .left {
      width: 70%;
      display: flex;
      align-items: center;

      .logo {
        margin-right: 40px;

        .slogan {
          font-size: 21px;
        }

        .en_slogan {
          font-size: 12px;
          margin-top: 2px;
        }
      }

      .nav {
        > a {
          margin-right: 30px;
          font-size: 16px;
        }
      }

      .search {
        svg {
          cursor: pointer;
        }
      }
    }

    .right {
      width: 30%;
      display: flex;
      justify-content: end;

      .theme {
        margin-left: 20px;
        display: flex;
        align-items: center;

        svg {
          cursor: pointer;
        }
      }
    }
  }
}
</style>