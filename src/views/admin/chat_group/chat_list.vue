<template>
  <div class="chat_list_view">
    <div class="record_list">
      <template v-for="item in chatRecordData.list">
        <div v-if="item.msg_type === 2" :class="{message: true, isMe: item.isMe}">
          <img class="avatar" :src="'/'+item.avatar" alt="">
          <div class="message-main">
            <div class="message-user">{{ item.nick_name }}</div>
            <div class="message-content">
              <div class="content">
                <div class="txt-message">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="item.msg_type === 1 || item.msg_type === 7" :class="'system '+'system_'+item.msg_type.toString() ">
          <div class="txt-message">{{ item.content }}</div>
        </div>
      </template>

    </div>
    <div class="config">
      <gvb_title title="群聊设置"></gvb_title>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import type {messageRecordType} from "@/api/message_api";
import type {listDataType} from "@/api";
import Gvb_title from "@/components/common/gvb_title.vue";
import {chatRecordApi} from "@/api/chat_api";
import type {chatType} from "@/api/chat_api";
import type {paramsType} from "@/api";

const params = reactive<paramsType>({
  page: 1,
  limit: 50,
})

const chatRecordData = reactive<listDataType<chatType>>({
  list: [],
  count: 0
})


async function getData() {
  let res = await chatRecordApi(params)
  chatRecordData.list = res.data.list
  chatRecordData.count = res.data.count
}

getData()


</script>

<style lang="scss">
.chat_list_view {
  display: flex;
  height: calc(100vh - 130px);
  justify-content: space-between;

  .record_list {
    width: calc(100% - 300px);
    padding: 20px;
    height: 100%;
    background-color: var(--color-bg-1);
    border-radius: 5px;

    overflow-y: auto;

    .message {
      display: flex;
      margin-bottom: 20px;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .message-main {
        margin-left: 10px;

        .message-content {
          margin-top: 5px;

          .content {
            display: flex;
            margin-left: 5px;
          }
        }

        .txt-message {
          background-color: var(--color-fill-2);
          border-radius: 5px;
          padding: 10px;
          position: relative;
          width: fit-content;
          min-height: 41px;
          white-space: break-spaces;
          word-break: break-all;

          &:before {
            content: "";
            display: block;
            position: absolute;
            left: -20px;
            top: 6px;
            border-width: 5px 10px;
            border-style: solid;
            border-color: transparent var(--color-fill-2) transparent transparent;
          }
        }
      }


      &.isMe {
        justify-content: right;
        flex-direction: row-reverse;

        .message-main {
          margin-left: 0;
          margin-right: 10px;

          .message-user {
            text-align: right;
          }

          .txt-message {
            &:before {
              content: "";
              display: block;
              position: absolute;
              right: -20px;
              left: inherit;
              top: 6px;
              border-width: 5px 10px;
              border-style: solid;
              border-color: transparent transparent transparent var(--color-fill-2);
            }
          }

        }


      }
    }

    .system {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;

      .txt-message {
        padding: 5px 10px;
        background-color: var(--color-fill-2);
        border-radius: 5px;
        color: var(--color-text-2);
      }
    }
  }

  .config {
    width: 280px;
    height: 100%;
    background-color: var(--color-bg-1);
    border-radius: 5px;
    padding: 20px;
  }
}
</style>