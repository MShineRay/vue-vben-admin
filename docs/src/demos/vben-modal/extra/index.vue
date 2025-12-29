<script lang="ts" setup>
import { useEDPModal, EDPButton } from '@edp/common-ui';

import ExtraModal from './modal.vue';

const [Modal, modalApi] = useEDPModal({
  // 连接抽离的组件
  connectedComponent: ExtraModal,
});

function openModal() {
  modalApi.open();
}
</script>

<template>
  <div>
    <Modal />
    <EDPButton @click="openModal">Open</EDPButton>
  </div>
</template>
