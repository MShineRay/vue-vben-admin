<script lang="ts" setup>
import { useEDPModal, EDPButton } from '@edp/common-ui';

const [Modal, modalApi] = useEDPModal();
</script>
<template>
  <div>
    <EDPButton @click="() => modalApi.open()">Open</EDPButton>
    <Modal class="w-[600px]" title="基础示例"> modal content </Modal>
  </div>
</template>
