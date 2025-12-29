<script lang="ts" setup>
import { useEDPModal } from '@edp/common-ui';

import { Button } from 'ant-design-vue';

import DragDemo from './drag-demo.vue';

const [Modal] = useEDPModal({
  destroyOnClose: true,
});
const [BaseModal, baseModalApi] = useEDPModal({
  connectedComponent: DragDemo,
});

function openNestedModal() {
  baseModalApi.open();
}
</script>
<template>
  <Modal title="嵌套弹窗示例">
    <Button @click="openNestedModal" type="primary">打开子弹窗</Button>
    <BaseModal />
  </Modal>
</template>
