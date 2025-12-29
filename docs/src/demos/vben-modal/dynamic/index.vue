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

function handleUpdateTitle() {
  modalApi.setState({ title: '外部动态标题' }).open();
}
</script>

<template>
  <div>
    <Modal />

    <EDPButton @click="openModal">Open</EDPButton>
    <EDPButton class="ml-2" type="primary" @click="handleUpdateTitle">
      从外部修改标题并打开
    </EDPButton>
  </div>
</template>
