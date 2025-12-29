<script lang="ts" setup>
import { useEDPModal } from '@edp/common-ui';

const [Modal] = useEDPModal({
  draggable: true,
});
</script>
<template>
  <Modal title="拖拽示例"> modal content </Modal>
</template>
