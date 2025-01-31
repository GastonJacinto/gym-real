'use server';
import { MappedData } from '@/utils/helpers';
import { createClient } from '@/utils/supabase/server';
import dayjs from 'dayjs';

export const deleteUserFn = async ({ user }: { user: MappedData }) => {
  const supabase = await createClient();
  const id = user.data.id;
  const { error } = await supabase
    .from('users')
    .update({
      deleted_at: new Date(),
      deleted: true,
    })
    .eq('id', id);
  if (error) {
    console.log(error);
    return {
      error: error.message,
    };
  }
  return {
    success: 'Usuario eliminado correctamente.',
  };
};
