import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { myManagerId } from '@/constants';
import GeneralDashboard from './dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Panel de control para la gestión del gimnasio',
};

export default async function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  const { data: manager } = await supabase
    .from('managers')
    .select()
    .eq('id', myManagerId)
    .single();
  const { data: usersWithProfile } = await supabase
    .from('users')
    .select('*, profiles(*)');

  return (
    <GeneralDashboard managerData={manager} usersData={usersWithProfile} />
  );
}
