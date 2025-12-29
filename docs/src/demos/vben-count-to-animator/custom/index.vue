<script lang="ts" setup>
import { EDPCountToAnimator } from '@edp/common-ui';
</script>
<template>
  <EDPCountToAnimator
    :duration="3000"
    :end-val="2000000"
    :start-val="1"
    prefix="$"
    separator="/"
  />
</template>
