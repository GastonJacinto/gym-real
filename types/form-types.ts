import { FormLabel } from '@/components/ui/form';
import { FormikErrors, FormikTouched } from 'formik';

export type LayoutType = FormPageType[];

export type FormPageType = {
  title?: string;
  fields: (DynamicFieldType | DynamicFieldType[])[];
};

export type DynamicFieldType = {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  initial?: string;
  required?: boolean;
  options?: OptionType[] | string;
  icon?: string;
  description?: string;
  fieldType?: string;
  selectOptionsTitle?: string;
  hide?: HideType;
  disabled?: boolean;
  multiple?: boolean;
  class?: string;
  variant?: string;
  min?: number | string;
  conditions?: string[];
  help?: string;
  readonly?: boolean;
  max?: number;
};
export type DynamicFieldProps = {
  field: DynamicFieldType | DynamicFieldType[];
  values: any;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
};
export type HideType = {
  [key: string]: string[];
};
export type OptionType = {
  label: string;
  value: string;
  isDisabled?: boolean;
};

export type UseFormStepsProps = {
  initialSteps: LayoutType;
  onStepValidation?: (step: any) => Promise<boolean> | boolean;
};

export type UseMultiFormStepsReturn = {
  steps: any[];

  currentStep: number;

  currentStepData: any;

  progress: number;

  isFirstStep: boolean;

  isLastStep: boolean;

  goToNext: () => Promise<boolean>;

  goToPrevious: () => void;
};
