<template>
  <div class="gvb_table">
    <div class="gvb_table_head">
      <div class="action_create">
        <a-button type="primary" @click="add">{{ addLabel }}</a-button>
      </div>
      <div class="action_group" v-if="!noActionGroup">
        <a-select placeholder="操作" style="width: 120px;" allow-clear :options="actionOptions"
                  v-model="actionValue"></a-select>
        <a-button type="primary" status="danger" v-if="actionValue" @click="actionMethod">执行</a-button>
      </div>
      <div class="action_search">
        <a-input-search
            placeholder="搜索"
            v-model="params.key" @keydown.enter="search"
            @search="search"></a-input-search>
      </div>
      <div class="action_other_search"></div>
      <div class="action_filter">
        <a-select placeholder="过滤"></a-select>
      </div>
      <div class="action_slot"></div>
      <div class="action_flush">
        <a-button @click="flush">
          <IconRefresh></IconRefresh>
        </a-button>
      </div>
    </div>

    <div class="gvb_table_data">
      <div class="gvb_table_source">
        <a-table :row-key=rowKey :columns="props.columns" :data="data.list" :row-selection="rowSelection"
                 v-model:selectedKeys="selectedKeys" :pagination="false">
          <template #columns>
            <template v-for="item in props.columns">
              <a-table-column v-if="item.render" :title="item.title as string">
                <template #cell="data">
                  <component :id="item.render(data)"></component>
                </template>
              </a-table-column>
              <a-table-column v-else-if="!item.slotName" :title="item.title as string"
                              :data-index="item.dataIndex"></a-table-column>
              <a-table-column :title="item.title as string" v-else>
                <template #cell="{record}" v-if="item.slotName === 'action'">
                  <div class="gvd_cell_actions">
                    <a-button type="primary" @click="edit(record)">编辑</a-button>
                    <a-popconfirm content="是否确认删除?" @ok="remove(record)">
                      <a-button status="danger" type="primary">删除</a-button>
                    </a-popconfirm>

                  </div>
                </template>
                <template #cell="{record}" v-else-if="item.slotName === 'created_at'">
                  <span>{{ dateTimeFormat(record.created_at) }}</span>
                </template>
                <template v-else #cell="{record}">
                  <slot :name="item.slotName" :record="record"></slot>
                </template>
              </a-table-column>
            </template>
          </template>
        </a-table>
      </div>
      <div class="gvb_table_page">
        <a-pagination :total="data.count" @change="pageChange" v-model:current="params.page"
                      :default-page-size="params.limit" show-total show-jumper/>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {IconRefresh} from "@arco-design/web-vue/es/icon";
import {reactive, ref} from "vue";
import type {baseResponse, listDataType} from "@/api";
import type {paramsType} from "@/api";
import type {TableColumnData, TableData, TableRowSelection} from "@arco-design/web-vue";
import {dateTimeFormat} from "@/utils/date";
import {Message} from "@arco-design/web-vue";
import {defaultDeleteApi} from "@/api";

interface Props {
  url: (params: paramsType) => Promise<baseResponse<listDataType<any>>>
  columns: TableColumnData[]
  limit?: number
  rowKey?: string
  addLabel?: string
  defaultDelete?: boolean // 是否启用默认删除
  noActionGroup?: boolean// 不启用操作组
}

const props = defineProps<Props>()

const {
  limit = 10,
  rowKey = "id",
  addLabel = "添加",
} = props

const emits = defineEmits(["add", "edit", "remove"])

const selectedKeys = ref<number[] | string[]>([]);
const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

interface optionType {
  label: string
  value: string | number
}

// 操作组
const actionOptions = ref<optionType[]>([
  {label: "批量删除", value: 1},
])

const actionValue = ref<number | string | undefined>(undefined)


function actionMethod() {
  // 判断是不是1
  if (actionValue.value === 1) {
    // 批量删除
    if (selectedKeys.value.length === 0) {
      Message.warning("请选择要删除的记录")
      return
    }
    removeIdData(selectedKeys.value)
  }
}

function add() {
  emits("add")
}

function edit(record: TableData) {
  emits("edit", record)
}

const urlRegex = /return useAxios.get\("(.*?)", .*?\)/


async function remove(record: TableData) {
  let id = record[rowKey]
  removeIdData([id])
}

async function removeIdData(idList: (number | string)[]) {
  if (props.defaultDelete) {
    let regexResult = urlRegex.exec(props.url.toString())
    if (regexResult === null || regexResult.length !== 2) {
      return
    }
    let res = await defaultDeleteApi(regexResult[1], idList)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
    getList()
    return;
  }
  emits("remove", idList)
}


const data = reactive<listDataType<any>>({
  list: [],
  count: 0,
})

const params = reactive<paramsType>({
  page: 1,
  limit: limit,
  key: ""
})

async function getList() {
  let res = await props.url(params)
  data.list = res.data.list
  data.count = res.data.count
}

function pageChange() {
  getList()
}

// 搜索
function search() {
  // 搜索的时候，页数就在第一页
  params.page = 1
  getList()
}

// 刷新
function flush() {
  Message.success("刷新成功")
  getList()
}


getList()


</script>

<style lang="scss">
.gvb_table {
  background-color: var(--color-bg-1);
  border-radius: 5px;

  .gvb_table_head {
    padding: 20px 20px 10px 20px;
    border-bottom: 1px solid var(--bg);
    display: flex;
    align-items: center;
    position: relative;

    > div {
      margin-right: 10px;
    }

    .action_group {
      display: flex;

      button {
        margin-left: 10px;
      }
    }

    .action_flush {
      position: absolute;
      right: 20px;
      margin-right: 0;

      button {
        padding: 0 10px;
      }
    }
  }

  .gvb_table_data {
    padding: 10px 20px 20px 20px;

    .gvb_table_source {
      .gvd_cell_actions {
        > button {
          margin-right: 10px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .gvb_table_page {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }

}
</style>