<template>
  <div class="gvb_article_list">
    <template v-if="data.list.length">
      <div class="source">
        <gvb_article_item v-for="item in data.list" :data="item"></gvb_article_item>
      </div>
      <div class="page">
        <a-pagination :total="data.count" v-model:current="params.page" @change="pageChange" show-total></a-pagination>
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
import type {articleParamsType} from "@/api/article_api";
import type {articleType} from "@/api/article_api";
import {reactive, watch} from "vue";
import type {listDataType, paramsType} from "@/api";
import {useRoute} from "vue-router";


const route = useRoute()
const data = reactive<listDataType<articleType>>({
  list: [],
  count: 0
})

const params = reactive<articleParamsType>({})

async function getData(p?: paramsType) {
  if (p) {
    Object.assign(params, p)
  }
  let res = await articleListApi(params)
  data.list = res.data.list
  data.count = res.data.count
}


defineExpose({
  getData,
})

watch(() => route.query, () => {
  if (route.query.date !== "") {
    params.date = route.query.date as string
  }
  if (route.query.tag !== "") {
    params.tag = route.query.tag as string
  }
  getData()
}, {deep: true, immediate: true})


function pageChange() {
  getData()
}

</script>
<style lang="scss">
.gvb_article_list {
  .gvb_article_item {
    background-color: var(--color-bg-1);
    margin-bottom: 20px;
    transition: all .3s;

    &:hover {
      transform: translateY(-5px) scale(1.005);
      box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.05);
    }

    &:first-child {
      border-radius: 0 0 5px 5px;
      transform: inherit;
      box-shadow: inherit;
    }

    .info {
      .title {
        font-size: 20px;
      }

      .abstract {
        margin-top: 10px;
      }
    }
  }

  .page {
    display: flex;
    justify-content: center;
    background-color: var(--color-bg-1);
    padding: 20px 10px;
    border-radius: 5px;
  }

  .nodata {
    background-color: var(--color-bg-1);
    border-radius: 0 0 5px 5px;
    padding: 40px 0;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1400px) {
  .gvb_article_list{
    .gvb_article_item{
      .cover{
        width: 35%;
      }
      .info{
        width: 65%;
      }
    }
  }
}
</style>