<script setup lang="ts">
import type { SupportedLanguagesType } from '@edp/locales';

import { SUPPORT_LANGUAGES } from '@edp/constants';
import { Languages } from '@edp/icons';
import { loadLocaleMessages } from '@edp/locales';
import { preferences, updatePreferences } from '@edp/preferences';

import { EDPDropdownRadioMenu, EDPIconButton } from '@edp-core/shadcn-ui';

defineOptions({
  name: 'LanguageToggle',
});

async function handleUpdate(value: string | undefined) {
  if (!value) return;
  const locale = value as SupportedLanguagesType;
  updatePreferences({
    app: {
      locale,
    },
  });
  await loadLocaleMessages(locale);
}
</script>

<template>
  <div>
    <EDPDropdownRadioMenu
      :menus="SUPPORT_LANGUAGES"
      :model-value="preferences.app.locale"
      @update:model-value="handleUpdate"
    >
      <EDPIconButton class="hover:animate-[shrink_0.3s_ease-in-out]">
        <Languages class="text-foreground size-4" />
      </EDPIconButton>
    </EDPDropdownRadioMenu>
  </div>
</template>
