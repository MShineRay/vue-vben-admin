import type {
  EDPFormSchema as FormSchema,
  EDPFormProps,
} from '@edp/common-ui';

import type { ComponentType } from './component';

import { setupEDPForm, useEDPForm as useForm, z } from '@edp/common-ui';
import { $t } from '@edp/locales';

import { initComponentAdapter } from './component';

initComponentAdapter();
setupEDPForm<ComponentType>({
  config: {
    baseModelPropName: 'value',
    // naive-ui组件的空值为null,不能是undefined，否则重置表单时不生效
    emptyStateValue: null,
    modelPropNameMap: {
      Checkbox: 'checked',
      Radio: 'checked',
      Switch: 'checked',
      Upload: 'fileList',
    },
  },
  defineRules: {
    required: (value, _params, ctx) => {
      if (value === undefined || value === null || value.length === 0) {
        return $t('ui.formRules.required', [ctx.label]);
      }
      return true;
    },
    selectRequired: (value, _params, ctx) => {
      if (value === undefined || value === null) {
        return $t('ui.formRules.selectRequired', [ctx.label]);
      }
      return true;
    },
  },
});

const useEDPForm = useForm<ComponentType>;

export { useEDPForm, z };

export type EDPFormSchema = FormSchema<ComponentType>;
export type { EDPFormProps };
