<script lang="ts" setup>
import { useEDPDrawer } from '@edp/common-ui';

const [Drawer] = useEDPDrawer();
</script>
<template>
  <Drawer title="组件抽离示例"> extra drawer content </Drawer>
</template>
