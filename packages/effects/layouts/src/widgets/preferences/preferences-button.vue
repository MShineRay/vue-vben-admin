<script lang="ts" setup>
import { Settings } from '@edp/icons';

import { EDPIconButton } from '@edp-core/shadcn-ui';

import Preferences from './preferences.vue';

const emit = defineEmits<{ clearPreferencesAndLogout: [] }>();

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout');
}
</script>
<template>
  <Preferences @clear-preferences-and-logout="clearPreferencesAndLogout">
    <EDPIconButton class="hover:animate-[shrink_0.3s_ease-in-out]">
      <Settings class="text-foreground size-4" />
    </EDPIconButton>
  </Preferences>
</template>
