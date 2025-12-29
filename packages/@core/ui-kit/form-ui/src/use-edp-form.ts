import type {
  BaseFormComponentType,
  ExtendedFormApi,
  EDPFormProps,
} from './types';

import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue';

import { useStore } from '@edp-core/shared/store';

import { FormApi } from './form-api';
import EDPUseForm from './edp-use-form.vue';

export function useEDPForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: EDPFormProps<T>) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  const extendedApi: ExtendedFormApi = api as never;
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector);
  };

  const Form = defineComponent(
    (props: EDPFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...props, ...attrs });
      return () =>
        h(EDPUseForm, { ...props, ...attrs, formApi: extendedApi }, slots);
    },
    {
      name: 'EDPUseForm',
      inheritAttrs: false,
    },
  );
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        api.setState({ schema: options.schema });
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
