'use server';
import { parseFormData } from '@/utils/helpers';
import { createClient } from '@/utils/supabase/server';

export async function editPrincingPlan(formData: FormData) {
  const supabase = await createClient();
  const values = parseFormData(formData, 'values');
  const { title, description, price, features, id, credits } = values;
  if (!title || !description || !price || !features || !id || !credits) {
    throw new Error('Todos los campos son requeridos.');
  }
  const { error } = await supabase
    .from('plans')
    .update({
      title,
      description,
      price,
      credits,
      // features
    })
    .eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Error al actualizar el plan.');
  }
  return 'Plan actualizado correctamente.';
}
