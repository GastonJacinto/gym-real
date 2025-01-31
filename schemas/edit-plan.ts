import { DynamicFieldType, LayoutType } from '@/types/form-types';
import * as z from 'zod';

const isRequired = (zod: any) => {
  return zod.min(1, `Campo obligatorio`);
};

const schema = z.object({
  title: z.string(),
  features: z
    .array(z.string().min(1, 'La característica no puede estar vacía'))
    .min(1, 'Debe haber al menos una característica'),
  features_length: z.number().min(1, 'Debe haber al menos una característica'),
});

export function generateZodSchema(layout: LayoutType): z.ZodSchema {
  const schemaObject: Record<string, any> = {};

  layout.forEach((section) => {
    section.fields.forEach((field) => {
      if (Array.isArray(field)) {
        // Si es un array de campos (agrupados en columnas)
        field.forEach((subField) => {
          schemaObject[subField.name] = getFieldValidation(subField);
        });
      } else {
        // Si es un campo individual
        schemaObject[field.name] = getFieldValidation(field);
      }
    });
  });

  return z.object(schemaObject);
}

function getFieldValidation(field: DynamicFieldType) {
  let zodType = typeMap[field.type] || z.any();

  if (field.type === 'features') {
    zodType = z
      .array(z.string().min(1, 'La característica no puede estar vacía'))
      .min(1, 'Debe haber al menos una característica');
  }

  if (field?.required && zodType) {
    zodType = zodType.min(1, `Campo obligatorio`);
  }

  return zodType;
}
const typeMap: Record<string, any> = {
  text: z.string(),
  email: z.string().email(),
  select: z.string(),
  textarea: z.string(),
  features_length: z.number().min(1, 'Debe haber al menos una característica'),
  number: z.coerce.number(),
  checkbox: z.boolean(),
  radio: z.string(),
  features: z.array(z.string()),
  date: z.date(),
  time: z.string(),
  datetime: z.string(),
};
