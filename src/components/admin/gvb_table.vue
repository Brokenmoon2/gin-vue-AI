<template>
  <div class="gvb_table">
    <div class="gvb_table_head">
      <div class="action_create">
        <a-button type="primary">添加</a-button>
      </div>
      <div class="action_group">
        <a-select placeholder="操作"></a-select>
      </div>
      <div class="action_search">
        <a-input-search placeholder="搜索"></a-input-search>
      </div>
      <div class="action_other_search"></div>
      <div class="action_filter">
        <a-select placeholder="过滤"></a-select>
      </div>
      <div class="action_slot"></div>
      <div class="action_flush">
        <a-button>
          <IconRefresh></IconRefresh>
        </a-button>
      </div>
    </div>

    <div class="gvb_table_data">
      <div class="gvb_table_source">
        <a-table :columns="props.columns" :data="data.list" :row-selection="rowSelection"
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
                    <a-button type="primary">编辑</a-button>
                    <a-button status="danger" type="primary">删除</a-button>
                  </div>
                </template>
                <template #cell="{record}" v-else-if="item.slotName === 'created_at'">
                  <span>自定义时间</span>
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
        <a-pagination :total="data.count" show-total show-jumper/>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {IconRefresh} from "@arco-design/web-vue/es/icon";
import {reactive, ref} from "vue";
import {listResponse} from "@/api";
import type {paramsType} from "@/api";
import type {TableColumnData} from "@arco-design/web-vue";

interface Props {
  url: (params: paramsType) => Promise<listResponse<any>>
  columns: TableColumnData[]
}

const props = defineProps<Props>()


const data = reactive({
  list: [],
  count: 0,
})

async function getList() {
  let res = await props.url({})
  data.list = res.data.list
  data.count = res.data.count
}

getList()

const selectedKeys = ref(['Jane Doe', 'Alisa Ross']);
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});


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