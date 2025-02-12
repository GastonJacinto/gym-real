import {
  DynamicFieldType,
  FormPageType,
  LayoutType,
  OptionType,
} from '@/types/form-types';
import {
  validateDNI,
  validateEmail,
  validateFeatures,
  validatePhone,
} from './validations';
import dayjs from 'dayjs';
import { usePlanStore } from '@/stores/plans-store';
import { Plan } from '@/types/db-types';

export const itsHidden = (field: DynamicFieldType, values: any) => {
  const langSpecificHide = field.hide;
  const statesToCheck = langSpecificHide || field.hide || {};

  const hideEntries = Object.entries(statesToCheck);
  const allHidden = hideEntries.some(([key, states]: [string, any]) => {
    return states.includes(values[key]);
  });
  return allHidden;
};
export const itsTitleHidden = (
  field: DynamicFieldType,
  prescreen_settings: any
) => {
  const statesToCheck = field?.conditions;
  const someFieldIsIncluded = prescreen_settings.some((item: any) => {
    let isIncluded = statesToCheck?.includes(item);
    return isIncluded;
  });
  return someFieldIsIncluded;
};

export const switchFieldType = (
  field: DynamicFieldType | DynamicFieldType[],
  values: any
): string => {
  if (Array.isArray(field)) {
    return 'text';
  }

  switch (field.type) {
    case 'select':
      if (field.name == 'province' && values?.country == 'INTERNATIONAL') {
        return 'text';
      }
      return field.type;
    default:
      return field.type;
  }
};
export const getMinValue = (field: DynamicFieldType, values: any) => {
  const pred_min_values: any = {
    today: dayjs().format('YYYY-MM-DD'),
  };
  if (field?.min) {
    const min: number = pred_min_values[field?.min] || field.min;
    return min;
  }
};
export const validations = (
  values: any,
  required?: boolean,
  max?: number
): any => ({
  email: (value: string) => validateEmail(value),
  features: (value: number) => validateFeatures(value),
  phone: (value: string) => validatePhone(value, required),
  dni: (value: string) => validateDNI(value, required),
});
export const requiredFields = (required?: boolean) => {
  return (value: any) => {
    if (required) {
      if (typeof value == 'undefined' || !value || (required && value === '')) {
        return 'Campo requerido';
      }
    }
  };
};
export const getSelectOptions = ({
  options,
  name,
  disabled,
  values,
  custom_options,
}: {
  options?: OptionType[] | string;
  name: string;
  disabled: boolean;
  values: any;
  custom_options: {
    plans: Plan[];
  };
}): { opt: OptionType[]; isDisabled: boolean } => {
  let opt: OptionType[] = []; // Initialize as an empty array
  let isDisabled: boolean = disabled;

  if (options && Array.isArray(options) && typeof options !== 'string') {
    opt = options; // If options are valid, assign them directly
  } else {
    if (options === 'credits') {
      const { plans } = custom_options;
      opt = plans.map((plan) => ({
        label: plan.title,
        value: String(plan.credits),
        isDisabled: false,
      }));
    }
  }

  // If after validating all the above, "opt" is still empty, then add a default option
  if (opt.length === 0) {
    opt = [{ label: 'No hay opciones', value: 'empty-opt', isDisabled: true }];
  }

  return { opt, isDisabled };
};

export const getValidationRule = (field: DynamicFieldType) => {
  switch (field.type) {
    case 'email':
      return 'email';
    case 'phone':
      return 'phone';
    default:
      return field?.name;
  }
};
export const getInitialValues = (layout: LayoutType, values: any = {}) => {
  const initialValues: any = {};

  const setInitialValue = (field: DynamicFieldType) => {
    if (field?.name) {
      if (values[field.name]) {
        initialValues[field.name] = values[field.name];
      } else if ('initial' in field) {
        initialValues[field.name] = field.initial;
      } else if (field.type == 'select' && field?.options) {
        initialValues[field.name] = field.options[0];
      } else if (field.type == 'number') {
        initialValues[field.name] = 0;
      } else {
        initialValues[field.name] = '';
      }
    }
  };

  layout?.forEach((step: FormPageType) => {
    step?.fields?.forEach((field: DynamicFieldType | DynamicFieldType[]) => {
      if (Array.isArray(field)) {
        field?.forEach(setInitialValue);
      } else {
        setInitialValue(field);
      }
    });
  });

  Object.keys(values).forEach((key) => {
    if (!(key in initialValues)) {
      initialValues[key] = values[key];
    }
  });

  return initialValues;
};
