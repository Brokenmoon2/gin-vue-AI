<template>
  <div>
    <gvb_table
        :url="userListApi"
        :columns="columns"
        default-delete
        add-label="创建用户"
        no-confirm
        :filter-group="filterGroup"
        search-placeholder="搜索用户名、昵称"
        @add="add"
        @edit="edit">
      <template #avatar="{record}">
        <a-avatar :imageUrl="record.avatar"></a-avatar>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">

import Gvb_table from "@/components/admin/gvb_table.vue";
import {userListApi} from "@/api/user_api";
import type {userInfoType} from "@/api/user_api";
import type {filterOptionType} from "@/components/admin/gvb_table.vue";
import {roleIdListApi} from "@/api/role_api";
import type {RecordType} from "@/components/admin/gvb_table.vue";

const columns = [
  {title: '昵称', dataIndex: 'nick_name'},
  {title: '头像', slotName: 'avatar'},
  {title: '邮箱', dataIndex: 'email'},
  {title: '角色', dataIndex: 'role'},
  {title: 'ip', dataIndex: 'ip'},
  {title: '注册时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]
const filterGroup: filterOptionType[] = [
  {
    label: "角色过滤",
    column: "role",
    source: roleIdListApi
  }
]

function add() {
  console.log("add")
}

function edit(record: RecordType<userInfoType>): void {
  console.log(record)
}

</script>