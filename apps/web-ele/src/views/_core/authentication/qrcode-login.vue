<script lang="ts" setup>
import { AuthenticationQrCodeLogin } from '@edp/common-ui';
import { LOGIN_PATH } from '@edp/constants';

defineOptions({ name: 'QrCodeLogin' });
</script>

<template>
  <AuthenticationQrCodeLogin :login-path="LOGIN_PATH" />
</template>
