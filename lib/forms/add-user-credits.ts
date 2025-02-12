'use server';
import { parseFormData } from '@/utils/helpers';
import { createClient } from '@/utils/supabase/server';

export async function addCreditsToUser(formData: FormData) {
  const supabase = await createClient();
  const values = parseFormData(formData, 'values');
  const { credits, user_id } = values;
  if (!credits || !user_id) {
    throw new Error('Todos los campos son requeridos.');
  }
  const { error } = await supabase
    .from('profiles')
    .update({
      credits: Number(credits),
    })
    .eq('user_id', user_id);

  if (error) {
    throw new Error('Error al asignar los creditos.');
  }
  return 'Creditos asignados correctamente.';
}
