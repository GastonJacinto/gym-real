'use server';
import { getDataFromFormData } from '@/utils/helpers';
import { ActionResponse, formSchema } from '../form-schemas';
import { z } from 'zod';
export const serverAction = async (
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> => {
  const rawData = getDataFromFormData(formData);
  console.log(rawData);
  // convert 'on' values to boolean
  for (const key in rawData) {
    if (rawData[key] === 'on') {
      rawData[key] = true;
    }
  }
  // validate inputs data with zod schema
  const validatedData = formSchema.safeParse(rawData);
  console.log(validatedData);
  if (!validatedData.success) {
    return {
      success: false,
      message: 'Revisa los datos ingresados',
      errors: validatedData.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }
  // do something with the data
  return {
    success: true,
    message: 'Data saved',
  };
};
