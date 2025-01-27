import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { myManagerId } from '@/constants';
import PrincingDashboard from './pricing';

export const metadata: Metadata = {
  title: 'Dashboard | Precios y Planes',
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

  const { data: plans } = await supabase.from('plans').select();
  console.log(plans);
  return <PrincingDashboard plansData={plans} />;
}
