<script lang="ts" setup>
import { useEDPDrawer, EDPButton } from '@edp/common-ui';

import ExtraDrawer from './drawer.vue';

const [Drawer, drawerApi] = useEDPDrawer({
  // 连接抽离的组件
  connectedComponent: ExtraDrawer,
});

function open() {
  drawerApi.open();
}

function handleUpdateTitle() {
  drawerApi.setState({ title: '外部动态标题' }).open();
}
</script>

<template>
  <div>
    <Drawer />

    <EDPButton @click="open">Open</EDPButton>
    <EDPButton class="ml-2" type="primary" @click="handleUpdateTitle">
      从外部修改标题并打开
    </EDPButton>
  </div>
</template>
