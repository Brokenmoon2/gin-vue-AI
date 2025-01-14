<template>
  <div class="home_view">
    <div class="welcome">
      <div class="title">
        早安，xxxx，请开始一天的工作吧
      </div>
      <div class="weather">
        今日晴，0℃ - 10℃，天气寒冷，注意添加衣物。
      </div>
      <div class="statistics">
        <span>
          <span class="icon">
            <IconMessage></IconMessage>
          </span>
          在线流量：2333
        </span>
        <span>
           <span class="icon">
            <IconMessage></IconMessage>
          </span>
          用户总数：2333
        </span>
        <span>
           <span class="icon">
            <IconMessage></IconMessage>
          </span>
          文章总数：2333
        </span>
        <span>
           <span class="icon">
            <IconMessage></IconMessage>
          </span>
          群聊消息：2333
        </span>
        <span>
           <span class="icon">
            <IconMessage></IconMessage>
          </span>
          今日登录：2333
        </span>
      </div>
      <div class="link">
        <div>
          <span>前端教程：<a href="https://www.bilibili.com/video/BV1V94y1Y725">https://www.bilibili.com/video/BV1V94y1Y725</a></span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <gvb_card title="快捷入口" class="quick_entry">
          <div class="item" v-for="item in quickEntryList" :style="{'--icon_bg': item.bg, '--icon_color': item.color}">
            <div class="icon" @click="goLink(item)">
              <component :is="item.font"></component>
            </div>
            <div class="text">{{ item.text }}</div>
          </div>
        </gvb_card>
        <gvb_card class="statistics" title="数据统计">
          <div id="login_data"></div>
        </gvb_card>
      </div>
      <div class="right">
        <gvb_card title="更新日志" class="update_log">
          <div class="item" v-for="(item, index) in updateLogList">
           <span>
             <span class="index">{{ index + 1 }}.</span>
             <span class="content"><a-typography-paragraph :ellipsis="{
        rows: 1,
        showTooltip: true,
        css: true
      }">{{ item.title }}</a-typography-paragraph></span>
           </span>
            <span class="date">{{ relativeCurrentTime(item.created_at) }}</span>
          </div>
        </gvb_card>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {IconMessage} from "@arco-design/web-vue/es/icon";
import Gvb_card from "@/components/common/gvb_card.vue";
import type {Component} from "vue";
import {IconSettings} from "@arco-design/web-vue/es/icon";
import router from "@/router";
import {relativeCurrentTime} from "@/utils/date";
import {onMounted} from "vue";
import * as echarts from "echarts"
import type {EChartsOption} from "echarts";

interface quickEntryType {
  bg: string // 背景色
  color: string // 文字颜色
  font: Component
  text: string // 文字
  name?: string // 路由的名称
  link?: string // 可以跳外部链接
}

const quickEntryList: quickEntryType[] = [
  {
    bg: "#d2ecff",
    color: "#69c0ff",
    font: IconSettings,
    text: "日志列表",
    name: "user_list"
  },
  {
    bg: "#d2ecff",
    color: "#69c0ff",
    font: IconSettings,
    text: "日志列表123",
    link: "https://www.bilibili.com/video/BV1V94y1Y725"
  }
]

function goLink(item: quickEntryType) {
  if (item.name) {
    router.push({
      name: item.name
    })
    return
  }
  if (item.link) {
    window.open(item.link, "_blank")
  }

}


interface updateLogType {
  id?: number
  title: string
  created_at: string
}

const updateLogList: updateLogType[] = [
  {
    title: " 八代博客重磅更新，日志功能优化，群聊功能大更新",
    created_at: "2023-10-05 00:00:00"
  },
  {
    title: " 八代博客重磅更新，日志功能优化，群聊功能大更新",
    created_at: "2023-10-05 00:00:00"
  }
]

onMounted(() => {
  const chartDom = document.getElementById('login_data')!;
  const myChart = echarts.init(chartDom);
  let option: EChartsOption;

  option = {
    title: {
      text: '用户数据'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['登录', '注册',]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '登录',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '注册',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
    ]
  };

  option && myChart.setOption(option);
})


</script>

<style lang="scss">
.home_view {
  .welcome {
    width: 100%;
    background-image: url("https://demo.gin-vue-admin.com/assets/dashboard-70e55b71.png");
    background-repeat: no-repeat;
    background-position: right;
    background-color: var(--color-bg-1);
    padding: 20px;
    border-radius: 5px;
    color: var(--color-text-2);

    .title {
      font-size: 22px;
      margin-top: 10px;
      font-weight: 400;
      color: var(--color-text-1);
    }

    .weather {
      margin: 20px 0 10px 0;
    }

    .statistics {
      margin: 20px 0 10px 0;
      font-size: 16px;

      > span {
        margin-right: 20px;
      }
    }

    .link {
      margin: 30px 0 20px 0;

      a {
        text-decoration: none;
        color: var(--active);
      }
    }
  }

  .main {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .left {
      width: 70%;

      .quick_entry {
        .body {
          display: flex;
        }

        .item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-right: 30px;

          &:last-child {
            margin-right: 0;
          }

          .icon {
            background-color: var(--icon_bg);
            color: var(--icon_color);
            border-radius: 10px;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            transition: all .3s;
            cursor: pointer;

            svg {
              transition: all .3s;
            }

            &:hover {
              transform: scale(1.05);

              svg {
                transform: scale(1.20);
              }
            }
          }

          .text {
            margin-top: 5px;
            color: var(--color-text-2);
          }
        }
      }

      .statistics {
        margin-top: 20px;

        #login_data {
          height: 300px;
        }
      }
    }

    .right {
      width: calc(30% - 20px);

      .update_log {
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--color-text-2);
          height: 40px;

          > span {
            display: flex;
            align-items: center;
            white-space: nowrap;

            .index {
              margin-right: 10px;
            }
          }

          .content {
            display: flex;

            .arco-typography {
              margin-bottom: 0;
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>