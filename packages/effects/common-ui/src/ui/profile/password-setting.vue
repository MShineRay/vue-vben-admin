<script setup lang="ts">
import type { Recordable } from '@edp/types';

import type { EDPFormSchema } from '@edp-core/form-ui';

import { computed, reactive } from 'vue';

import { useEDPForm } from '@edp-core/form-ui';
import { EDPButton } from '@edp-core/shadcn-ui';

interface Props {
  formSchema?: EDPFormSchema[];
}

const props = withDefaults(defineProps<Props>(), {
  formSchema: () => [],
});

const emit = defineEmits<{
  submit: [Recordable<any>];
}>();

const [Form, formApi] = useEDPForm(
  reactive({
    commonConfig: {
      // 所有表单项
      componentProps: {
        class: 'w-full',
      },
    },
    layout: 'horizontal',
    schema: computed(() => props.formSchema),
    showDefaultActions: false,
  }),
);

async function handleSubmit() {
  const { valid } = await formApi.validate();
  const values = await formApi.getValues();
  if (valid) {
    emit('submit', values);
  }
}

defineExpose({
  getFormApi: () => formApi,
});
</script>
<template>
  <div>
    <Form />
    <EDPButton type="submit" class="mt-4" @click="handleSubmit">
      更新密码
    </EDPButton>
  </div>
</template>
