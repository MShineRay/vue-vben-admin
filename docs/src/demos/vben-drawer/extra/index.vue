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
</script>

<template>
  <div>
    <Drawer />
    <EDPButton @click="open">Open</EDPButton>
  </div>
</template>
