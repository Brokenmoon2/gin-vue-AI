<template>
  <div class="menu_list_view">
    <menu_create v-model:visible="visible" @ok="gvbTable.getList()"></menu_create>
    <gvb_table
        :url="menuListApi"
        :columns="columns"
        default-delete
        add-label="创建菜单"
        no-confirm
        ref="gvbTable"
        no-page
        no-check
        no-action-group
        search-placeholder="搜索菜单名称"
        @add="visible=true"
        @edit="edit">
      <template #banners="{record}:{record: menuType}">
        <div class="menu_column_image">
          <a-image
              v-for="item in record.banners"
              height="40px"
              :key="item.id" :src="item.path"></a-image>
        </div>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">
import {menuListApi} from "@/api/menu_api";
import Gvb_table from "@/components/admin/gvb_table.vue";
import {ref} from "vue";
import type {menuType} from "@/api/menu_api";
import Menu_create from "@/components/admin/menu_create.vue";

const gvbTable = ref()

const columns = [
  {title: '序号', dataIndex: 'sort'},
  {title: '菜单标题', dataIndex: 'title'},
  {title: '路径', dataIndex: 'path'},
  {title: 'slogan', dataIndex: 'slogan'},
  {title: '简介', dataIndex: 'abstract'},
  {title: 'slogan切换时间', dataIndex: 'banner_time'},
  {title: '简介切换时间', dataIndex: 'abstract_time'},
  {title: 'banner', slotName: 'banners'},
  {title: '更新时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]

const visible = ref(false)

function edit(record: menuType) {
  console.log(record)
}


</script>


<style lang="scss">
.menu_list_view {
  .menu_column_image {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 5px;

    .arco-image-img {
      border-radius: 5px;
    }
  }
}

</style>