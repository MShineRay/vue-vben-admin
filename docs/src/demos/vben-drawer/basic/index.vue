<script lang="ts" setup>
import { useEDPDrawer, EDPButton } from '@edp/common-ui';

const [Drawer, drawerApi] = useEDPDrawer();
</script>
<template>
  <div>
    <EDPButton @click="() => drawerApi.open()">Open</EDPButton>
    <Drawer class="w-[600px]" title="基础示例"> drawer content </Drawer>
  </div>
</template>
