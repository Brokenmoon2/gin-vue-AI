<template>
  <div class="gvb_tabs">
    <span class="gvb_tab active">首页</span>
    <span class="gvb_tab">用户列表</span>
    <span class="gvb_tab">文章列表</span>
  </div>
</template>

<script setup lang="ts">

</script>
<style lang="scss">
.gvb_tabs {
  height: 30px;
  width: 100%;
  border-bottom: 1px solid var(--bg);
  padding: 0 20px;
  display: flex;
  align-items: center;

  .gvb_tab {
    border-radius: 5px;
    border: 1px solid var(--bg);
    padding: 2px 8px;
    margin-right: 10px;
    cursor: pointer;

    &.active {
      background-color: var(--active);
      color: white;
      border: none;
    }
  }
}
</style>