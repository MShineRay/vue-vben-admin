<script setup lang="ts">
import type { Recordable } from '@edp/types';

import { computed, reactive } from 'vue';

import { $t } from '@edp/locales';

import { useEDPForm, z } from '@edp-core/form-ui';
import { useEDPModal } from '@edp-core/popup-ui';
import { EDPAvatar, EDPButton } from '@edp-core/shadcn-ui';

interface Props {
  avatar?: string;
  text?: string;
}

defineOptions({
  name: 'LockScreenModal',
});

withDefaults(defineProps<Props>(), {
  avatar: '',
  text: '',
});

const emit = defineEmits<{
  submit: [Recordable<any>];
}>();

const [Form, { resetForm, validate, getValues, getFieldComponentRef }] =
  useEDPForm(
    reactive({
      commonConfig: {
        hideLabel: true,
        hideRequiredMark: true,
      },
      schema: computed(() => [
        {
          component: 'EDPInputPassword' as const,
          componentProps: {
            placeholder: $t('ui.widgets.lockScreen.placeholder'),
          },
          fieldName: 'lockScreenPassword',
          formFieldProps: { validateOnBlur: false },
          label: $t('authentication.password'),
          rules: z
            .string()
            .min(1, { message: $t('ui.widgets.lockScreen.placeholder') }),
        },
      ]),
      showDefaultActions: false,
    }),
  );

const [Modal] = useEDPModal({
  onConfirm() {
    handleSubmit();
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      resetForm();
    }
  },
  onOpened() {
    requestAnimationFrame(() => {
      getFieldComponentRef('lockScreenPassword')
        ?.$el?.querySelector('[name="lockScreenPassword"]')
        ?.focus();
    });
  },
});

async function handleSubmit() {
  const { valid } = await validate();
  const values = await getValues();
  if (valid) {
    emit('submit', values?.lockScreenPassword);
  }
}
</script>

<template>
  <Modal
    :footer="false"
    :fullscreen-button="false"
    :title="$t('ui.widgets.lockScreen.title')"
  >
    <div
      class="mb-10 flex w-full flex-col items-center px-10"
      @keydown.enter.prevent="handleSubmit"
    >
      <div class="w-full">
        <div class="ml-2 flex w-full flex-col items-center">
          <EDPAvatar
            :src="avatar"
            class="size-20"
            dot-class="bottom-0 right-1 border-2 size-4 bg-green-500"
          />
          <div class="text-foreground my-6 flex items-center font-medium">
            {{ text }}
          </div>
        </div>
        <Form />
        <EDPButton class="mt-1 w-full" @click="handleSubmit">
          {{ $t('ui.widgets.lockScreen.screenButton') }}
        </EDPButton>
      </div>
    </div>
  </Modal>
</template>
