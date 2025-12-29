import type {
  EDPFormSchema as FormSchema,
  EDPFormProps,
} from '@edp/common-ui';

import type { ComponentType } from './component';

import { setupEDPForm, useEDPForm as useForm, z } from '@edp/common-ui';
import { $t } from '@edp/locales';

async function initSetupEDPForm() {
  setupEDPForm<ComponentType>({
    config: {
      modelPropNameMap: {
        Upload: 'fileList',
        CheckboxGroup: 'model-value',
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
}

const useEDPForm = useForm<ComponentType>;

export { initSetupEDPForm, useEDPForm, z };

export type EDPFormSchema = FormSchema<ComponentType>;
export type { EDPFormProps };
