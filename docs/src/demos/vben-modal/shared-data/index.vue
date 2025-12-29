<script lang="ts" setup>
import { useEDPModal, EDPButton } from '@edp/common-ui';

import ExtraModal from './modal.vue';

const [Modal, modalApi] = useEDPModal({
  // 连接抽离的组件
  connectedComponent: ExtraModal,
});

function openModal() {
  modalApi
    .setData({
      content: '外部传递的数据 content',
      payload: '外部传递的数据 payload',
    })
    .open();
}
</script>

<template>
  <div>
    <Modal />

    <EDPButton @click="openModal">Open</EDPButton>
  </div>
</template>
