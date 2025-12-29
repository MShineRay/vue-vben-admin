<script lang="ts" setup>
import { EDPSpinner } from '@edp-core/shadcn-ui';

import { useContentSpinner } from './use-content-spinner';

defineOptions({ name: 'LayoutContentSpinner' });

const { spinning } = useContentSpinner();
</script>
<template>
  <EDPSpinner :spinning="spinning" />
</template>
