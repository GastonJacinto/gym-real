import { DynamicFieldProps, DynamicFieldType } from '@/types/form-types';
import {
  getSelectOptions,
  getValidationRule,
  itsHidden,
  requiredFields,
  switchFieldType,
  validations,
} from './functions';
import { FormDescription, FormLabel } from '../form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../select';
import { Input } from '../input';
import {
  CircleAlert,
  Coins,
  DollarSign,
  IdCard,
  Lock,
  Mail,
  Phone,
  Plus,
  Trash2,
  User,
} from 'lucide-react';
import { Field, FormikErrors, FormikTouched, useFormikContext } from 'formik';
import { usePlanStore } from '@/stores/plans-store';
import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '../button';
import './styles.css';
export function DynamicField({
  field,
  values,
  errors,
  touched,
}: DynamicFieldProps) {
  const { setFieldValue } = useFormikContext();

  if (Array.isArray(field)) {
    return (
      <ColsFields
        field={field}
        errors={errors}
        touched={touched}
        values={values}
      />
    );
  }
  const {
    name,
    type,
    label,
    placeholder,
    initial,
    required,
    options,
    hide,
    class: className,
    variant,
    icon,
    disabled = false,
    min,
    readonly,
    max,
    help,
    multiple,
    selectOptionsTitle,
  } = field;
  if (hide) {
    const hidden = itsHidden(field, values);
    if (hidden) {
      if (name in values) {
        if (field.type == 'select' && options) {
          values[name] = options[0];
        } else {
          values[name] = initial || '';
        }
      }
      return;
    }
  }
  const fieldType = type;
  // const fieldType = switchFieldType(field, values);

  const validationRule = getValidationRule(field);
  const validationRules =
    validations(values, required, max)[validationRule] ||
    requiredFields(required);

  switch (fieldType) {
    case 'features':
      return (
        <FeaturesInputComponent
          errors={errors}
          label={label}
          name={name}
          required={true}
          touched={touched}
          values={values}
        />
      );
    case 'select':
      const plans = usePlanStore((state) => state.plans);
      const { opt, isDisabled } = getSelectOptions({
        options,
        name,
        disabled,
        values,
        custom_options: {
          plans,
        },
      });
      return (
        <div className={className}>
          <FormLabelComponent
            help={help}
            label={label}
            id={name}
            required={required}
          />
          <Field
            as={Select}
            validate={validationRules}
            {...(multiple ? { multiple } : {})}
            required={required}
            name={name}
            id={name}
            className={'max-h-[200px] overflow-y-auto '}
            value={values[name] || initial || ''}
            placeholder={placeholder || label}
            readOnly={readonly}
            disabled={isDisabled}
            onValueChange={(value: React.ChangeEvent<HTMLSelectElement>) => {
              if (multiple) {
                setFieldValue(name, Array.isArray(value) ? value : [value]);
              } else {
                console.log(value);
                setFieldValue(name, value);
              }
            }}
          >
            <SelectTrigger className="">
              <SelectValue />
            </SelectTrigger>
            {!readonly && (
              <>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{selectOptionsTitle}</SelectLabel>
                    {opt?.map((option) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={option.value}
                        value={option.value}
                      >
                        <div className="flex items-center gap-2">
                          {icon && opt[0].value !== 'empty-opt' && (
                            <span className="">
                              {React.cloneElement(iconMap[icon], {
                                className: 'w-4 h-4',
                              })}
                            </span>
                          )}
                          <span> {option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </>
            )}
          </Field>
          {errorMessage({
            errors,
            id: name,
            touched,
          })}
        </div>
      );
    default:
      return (
        <div key={name} className={className}>
          <FormLabelComponent
            help={help}
            label={label}
            id={name}
            required={required}
          />
          <Field name={name} validate={validationRules}>
            {({ field, meta, form }: any) => (
              <Input
                {...field}
                id={name}
                name={name}
                icon={icon}
                type={type}
                required={required}
                min={min}
                value={values[name] || initial || ''}
                max={max}
                disabled={disabled}
                readOnly={readonly}
                placeholder={(placeholder && placeholder) || label}
                onWheel={(e) => {
                  e?.preventDefault();
                  field.onBlur(e);
                  form.setFieldTouched(name, true);
                }}
                variant={variant || 'outline'}
              />
            )}
          </Field>

          {errorMessage({
            errors,
            id: name,
            touched,
          })}
        </div>
      );
  }
}
export const FormLabelComponent = ({
  label,
  id,
  required,
  className,
  description,
  help,
  ...props
}: {
  label: string;
  id: string;
  help?: string;
  required?: boolean;
  description?: string;
  className?: string;
  [x: string]: any;
}) => {
  return (
    <div className="flex flex-col  gap-1 w-full">
      <div className="flex items-center w-full">
        <label {...props} htmlFor={id} className={` text-sm mr-1 ${className}`}>
          {label}
        </label>
        {required && <span className="text-red-500">*</span>}
        {help && (
          <span className="text-sm text-muted-foreground ml-1">{help}</span>
        )}
      </div>
      {description && (
        <p
          className={cn('text-[0.8rem] text-muted-foreground', className)}
          {...props}
        >
          {description}
        </p>
      )}
    </div>
  );
};
export const CustomFormLabel = ({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => {
  return (
    <>
      <FormLabel>{children}</FormLabel>{' '}
      {required && <span className="text-red-500">*</span>}
    </>
  );
};

export const ColsFields = ({
  values,
  field: cols,
  errors,
  touched,
}: DynamicFieldProps) => {
  if (!Array.isArray(cols)) return null;
  return (
    <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2">
      {cols?.map((col, colIndex) => {
        return (
          <div key={colIndex} className="w-full">
            <DynamicField
              touched={touched}
              errors={errors}
              key={`col-${col.name}-${colIndex}`}
              field={col}
              values={values}
            />
          </div>
        );
      })}
    </div>
  );
};

export const iconMap: any = {
  DollarSign: <DollarSign className="icon" />,
  Coins: <Coins className="icon" />,
  email: <Mail className="icon" />,
  lock: <Lock className="icon" />,
  user: <User className="icon" />,
  phone: <Phone className="icon" />,
  'id-card': <IdCard className="icon" />,
};

export const errorMessage = ({
  errors,
  id,
  touched,
  key,
  index,
}: {
  errors: any;
  id: string;
  touched: FormikTouched<any>;
  index?: number;
  key?: string;
}) => {
  const errorValue = errors[id];
  const touchedValue = touched[id];
  if (!errorValue || !touchedValue) return null;

  const getErrorText = (): string | null => {
    if (typeof errorValue === 'string') return errorValue;

    if (Array.isArray(errorValue) && index !== undefined) {
      if (errorValue[index] === undefined) return null;

      if (typeof errorValue[index] === 'string') return errorValue[index];
      if (typeof errorValue[index] === 'object' && key)
        return errorValue[index][key] || null;
    }

    return null;
  };

  const errorText = getErrorText();

  if (!errorText) return null;

  return (
    <div className="text-red-500 flex items-center gap-1 mt-1 text-sm">
      <CircleAlert className="text-destructive w-4 h-4" />
      <span>{errorText}</span>
    </div>
  );
};

export const FeaturesInputComponent = ({
  values,
  errors,
  name,
  touched,
  required,
  label,
}: {
  values: any;
  errors: FormikErrors<any>;
  name: string;
  touched: FormikTouched<any>;
  label: string;
  required: boolean;
}) => {
  const { setFieldValue } = useFormikContext();

  //-------------------------------------------------
  const [features, setFeatures] = React.useState<string[]>(
    values[name] || ['']
  );
  React.useEffect(() => {
    setFieldValue(name, features);
  }, [features]);
  const addFeature = () => {
    setFeatures((features) => [...features, '']);
    touched[name] = false;
  };
  const removeFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures((prevFeatures) =>
        prevFeatures.filter((_: any, i: number) => i !== index)
      );
      touched[name] = false;
    }
  };
  const handleChange = (index: number, value: string) => {
    setFeatures((prevFeatures) => {
      const updatedFeatures = [...prevFeatures];
      updatedFeatures[index] = value;
      return updatedFeatures;
    });
    setFieldValue(name, features);
  };

  return (
    <div className={'flex flex-col gap-2'}>
      <FormLabelComponent id={name} required={required} label={label} />
      <div className="basis-full flex flex-col flex-wrap gap-y-4">
        {features.map((feature: any, index: number) => {
          const field_name = `feature-${index}`;
          const validationRules =
            validations(feature)[field_name] || requiredFields(true)(feature);
          return (
            <div key={'feature-' + index + '-container'} className="">
              <div className="w-full flex gap-1">
                <Field
                  icon={'Coins'}
                  variant={'outline'}
                  value={feature}
                  name={field_name}
                  placeholder={`Caracteristica ${index + 1}`}
                  type={'text'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, e.target.value)
                  }
                  as={Input}
                  validate={validationRules}
                />

                <Button
                  variant={'destructive'}
                  size={'icon'}
                  type="button"
                  onClick={() => {
                    removeFeature(index);
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              {errorMessage({
                errors,
                id: field_name,
                touched,
              })}
            </div>
          );
        })}

        <Button
          className=" border-2 w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          variant={'outline'}
          type="button"
          onClick={addFeature}
        >
          <Plus /> Nueva caracteristica
        </Button>
      </div>
    </div>
  );
};
