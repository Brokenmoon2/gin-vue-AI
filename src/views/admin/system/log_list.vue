<template>
  <div class="log_list_view">
    <gvb_table
        :url="logListApi"
        :columns="columns"
        default-delete
        no-confirm
        no-add
        no-edit
        :default-params="params"
        ref="gvbTable"
        search-placeholder="搜索日志标题和用户名">
      <template #action_other_search>
        <div class="search_user">
          <a-input placeholder="搜索用户" v-model="params.userName" @change="getList"
                   @keydown.enter="getList"></a-input>
        </div>
        <div class="search_addr">
          <a-input placeholder="搜索地址" v-model="params.addr" @change="getList" @keydown.enter="getList"></a-input>
        </div>
        <div class="filter_status">
          <a-select :options="statusOptions" v-model="params.status" @change="getList" style="width: 130px"
                    placeholder="状态过滤" allow-clear></a-select>
        </div>
        <div class="search_date">
          <a-date-picker style="width: 140px" v-model="params.date" @change="getList"/>
        </div>
        <div class="check_log_type">
          <a-radio-group v-model="params.type" :options="logTypeOptions" @change="logTypeChange"></a-radio-group>
        </div>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">
import Gvb_table from "@/components/admin/gvb_table.vue";
import {h, reactive, ref} from "vue";
import {logListApi} from "@/api/log_api";
import type {logType, logRequest} from "@/api/log_api";
import {Tag} from "@arco-design/web-vue"

const gvbTable = ref()

const params = reactive<logRequest>({
  level: undefined,
  type: 2,
  ip: undefined,
  userID: undefined,
  addr: undefined,
  date: undefined,
  status: undefined,
  userName: undefined,
})

const statusOptions = [
  {label: "成功", value: true},
  {label: "失败", value: false},
]
const logTypeOptions = [
  {label: "登录日志", value: 1},
  {label: "操作日志", value: 2},
  {label: "运行日志", value: 3},
]

const columnDict = {
  1: [
    {title: 'ip', dataIndex: 'ip'},
    {title: '地址', dataIndex: 'addr'},
    {title: '标题', dataIndex: 'title'},
    {
      title: '状态', dataIndex: 'status', render: (data: any) => {
        const record = data.record as logType
        if (record.status) {
          return h(Tag, {color: "blue"}, {default: () => "成功"})
        }
        return h(Tag, {color: "red"}, {default: () => "失败"})
      }
    },
    {title: '用户名', dataIndex: 'userName'},
    {title: '密码', dataIndex: 'content'},
    {title: '日志时间', slotName: 'created_at'},
    {title: '操作', slotName: 'action'},
  ],
  2: [
    {title: 'ip', dataIndex: 'ip'},
    {title: '地址', dataIndex: 'addr'},
    {title: '用户名', dataIndex: 'userName'},
    {
      title: '等级', dataIndex: 'level', render: (data: any) => {
        const record = data.record as logType
        switch (record.level){
          case "info":
            return h(Tag, {color: "blue"}, {default: () => "info"})
          case "warning":
            return h(Tag, {color: "orange"}, {default: () => "warning"})
          case "error":
            return h(Tag, {color: "red"}, {default: () => "error"})
        }
      }
    },
    {title: '标题', dataIndex: 'title'},
    {title: '日志时间', slotName: 'created_at'},
    {title: '操作', slotName: 'action'},
  ],
  3: [
    {title: 'ip', dataIndex: 'ip'},
    {title: '标题', dataIndex: 'title'},
    {title: '服务', dataIndex: 'serviceName'},
    {
      title: '等级', dataIndex: 'level', render: (data: any) => {
        const record = data.record as logType
        switch (record.level){
          case "info":
            return h(Tag, {color: "blue"}, {default: () => "info"})
          case "warning":
            return h(Tag, {color: "orange"}, {default: () => "warning"})
          case "error":
            return h(Tag, {color: "red"}, {default: () => "error"})
        }
      }
    },
    {title: '日志时间', slotName: 'created_at'},
    {title: '操作', slotName: 'action'},
  ]
}


const columns = ref(columnDict[params.type as keyof typeof columnDict])

function logTypeChange(){
  gvbTable.value.clearData()
  columns.value = columnDict[params.type as keyof typeof columnDict]
  gvbTable.value.getList(params)
}

function getList() {
  if (params.status === "") {
    params.status = undefined
  }
  gvbTable.value.getList(params)
}


</script>
