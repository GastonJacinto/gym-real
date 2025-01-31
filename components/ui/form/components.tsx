import { DynamicFieldType } from '@/types/form-types';
import { itsHidden, switchFieldType } from './functions';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { Input } from '../input';
import { DollarSign, Plus, Trash2 } from 'lucide-react';
import { Button } from '../button';
import { useController } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

export function DynamicField({
  field,
  values,
  form,
}: {
  field: DynamicFieldType | DynamicFieldType[];
  values: any;
  form: any;
}) {
  if (Array.isArray(field)) {
    return <ColsFields cols={field} form={form} values={values} />;
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
    icon,
    disabled,
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
  switch (fieldType) {
    case 'features':
      const { field } = useController({ name, control: form.control });
      return (
        <>
          <FormField
            control={form.control}
            name="features_length" // Campo oculto para validar el length
            render={({ field }) => (
              <>
                <FormItem>
                  <CustomFormLabel required={required}>{label}</CustomFormLabel>
                  <Input
                    {...field}
                    type="hidden"
                    value={values?.features?.length || 0}
                  />
                </FormItem>
              </>
            )}
          />
          <div className="space-y-2">
            {field.value.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <FormItem className="flex items-center w-full gap-2 justify-center">
                  <FormField
                    control={form.control}
                    name={`features_${index}`}
                    render={({ field: featureField }) => (
                      <div className="flex items-center w-full gap-2 justify-center">
                        <Input
                          {...featureField}
                          value={feature}
                          onChange={(e) => {
                            const newValues = [...field.value];
                            newValues[index] = e.target.value;
                            field.onChange(newValues);
                          }}
                          required
                          placeholder="Nueva Característica"
                        />
                        <Button
                          type="button"
                          size={'icon'}
                          variant={'destructive'}
                          onClick={() => {
                            if (field.value.length > 1) {
                              field.onChange(
                                field.value.filter(
                                  (_: any, i: number) => i !== index
                                )
                              );
                            } else {
                              toast({
                                title: 'Error',
                                description:
                                  'Debes mantener al menos una característica en el plan.',
                                variant: 'destructive',
                              });
                            }
                          }}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    )}
                  />
                </FormItem>
              </div>
            ))}
            <Button
              type="button"
              className="w-full"
              onClick={() => field.onChange([...field.value, ''])}
            >
              <Plus /> Agregar característica
            </Button>
            <FormMessage />
          </div>
        </>
      );
    case 'select':
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => {
            return (
              <FormItem>
                <CustomFormLabel required={required}>{label}</CustomFormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options?.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            );
          }}
        />
      );

    default:
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => {
            return (
              <FormItem className="w-full space-y-1">
                <CustomFormLabel required={required}>{label}</CustomFormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    {...(icon && { icon: iconMap[icon] })}
                    placeholder={placeholder}
                    type={fieldType}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <div className="min-h-5">
                  <FormMessage />
                </div>
              </FormItem>
            );
          }}
        />
      );
  }
}

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
  form,
  values,
  cols,
}: {
  values: any;
  form: any;
  cols: DynamicFieldType[];
}) => {
  return (
    <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2">
      {cols?.map((col, colIndex) => {
        return (
          <div key={colIndex} className="w-full">
            <DynamicField
              key={`col-${col.name}-${colIndex}`}
              field={col}
              form={form}
              values={values}
            />
          </div>
        );
      })}
    </div>
  );
};

export const iconMap: any = {
  DollarSign: DollarSign,
};
