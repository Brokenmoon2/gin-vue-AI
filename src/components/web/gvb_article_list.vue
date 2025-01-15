<template>
  <div class="gvb_article_list">
    <template v-if="data.list.length">
      <div class="source">
        <gvb_article_item v-for="item in data.list" :data="item"></gvb_article_item>
      </div>
      <div class="page">
        <a-pagination :total="data.count" v-model:current="params.page" show-total></a-pagination>
      </div>
    </template>
    <template v-else>
      <a-empty class="nodata"></a-empty>
    </template>

  </div>
</template>

<script setup lang="ts">
import Gvb_article_item from "@/components/common/gvb_article_item.vue";
import {articleListApi} from "@/api/article_api";
import type {articleType} from "@/api/article_api";
import {reactive} from "vue";
import type {listDataType, paramsType} from "@/api";

const data = reactive<listDataType<articleType>>({
  list: [],
  count: 0
})

const params = reactive<paramsType>({})

async function getData() {
  let res = await articleListApi()
  data.list = res.data.list
  data.count = res.data.count
}

getData()


</script>
<style lang="scss">
.gvb_article_list {
  .gvb_article_item {
    background-color: var(--color-bg-1);
    margin-bottom: 20px;

    &:first-child {
      border-radius: 0 0 5px 5px;
    }

    .info {
      .title {
        font-size: 20px;
      }

      .abstract {
        margin-top: 10px;
        height: 4rem;
      }
    }
  }

  .page {
    display: flex;
    justify-content: center;
  }

  .nodata {
    background-color: var(--color-bg-1);
    border-radius: 0 0 5px 5px;
    padding: 40px 0;
  }
}
</style>