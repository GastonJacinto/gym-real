// layout.tsx
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Manager, User } from '@/types/db-types';
import { myManagerId } from '@/constants';
import { cookies } from 'next/headers';
import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Panel de control para la gestión del gimnasio',
};

export default async function DashboardLayout({
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

  const { data: managerData } = await supabase
    .from('managers')
    .select()
    .eq('id', myManagerId)
    .single();
  const { data: usersData } = await supabase
    .from('users')
    .select('*, profiles(*)');
  return (
    <AdminPanelLayout managerData={managerData} usersData={usersData}>
      {children}
    </AdminPanelLayout>
  );
}
