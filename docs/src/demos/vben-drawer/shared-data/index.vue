<script lang="ts" setup>
import { useEDPDrawer, EDPButton } from '@edp/common-ui';

import ExtraDrawer from './drawer.vue';

const [Drawer, drawerApi] = useEDPDrawer({
  // 连接抽离的组件
  connectedComponent: ExtraDrawer,
});

function open() {
  drawerApi
    .setData({
      content: '外部传递的数据 content',
      payload: '外部传递的数据 payload',
    })
    .open();
}
</script>

<template>
  <div>
    <Drawer />

    <EDPButton @click="open">Open</EDPButton>
  </div>
</template>
