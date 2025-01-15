<template>
  <div class="gvb_news">
    <span class="index">{{ data.index }}</span>
    <a class="title" :href="data.link" target="_blank">{{ data.title }}</a>
    <span class="hot">{{ data.hotValue }}</span>
  </div>
</template>

<script setup lang="ts">
import {newsType} from "@/api/news_api";
import {reactive} from "vue";

const data = reactive<newsType>({
  hotValue: "192.3万",
  index: "1",
  link: "https://s.weibo.com/weibo?q=%E8%AF%B7%E6%8A%8A%E8%BF%99%E4%B8%AA%E9%9F%A9%E7%BB%BC%E5%BC%95%E8%BF%9B%E5%86%85%E5%A8%B1",
  title: "请把这个韩综引进内娱",
})

</script>
<style lang="scss">
.gvb_news {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    color: var(--active);
    text-decoration: none;
    width: 80%;
  }
}
</style>