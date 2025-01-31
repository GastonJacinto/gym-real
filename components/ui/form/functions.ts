import { DynamicFieldType, FormPageType, LayoutType } from '@/types/form-types';

export const itsHidden = (field: DynamicFieldType, values: any) => {
  const langSpecificHide = field.hide;
  const statesToCheck = langSpecificHide || field.hide || {};

  const hideEntries = Object.entries(statesToCheck);
  const allHidden = hideEntries.some(([key, states]: [string, any]) => {
    return states.includes(values[key]);
  });
  return allHidden;
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

export const getInitialValues = (layout: LayoutType, values: any = {}) => {
  const initialValues: any = {};

  const setInitialValue = (field: DynamicFieldType) => {
    if (field?.name) {
      if (values[field.name]) {
        console.log(values[field.name]);
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
