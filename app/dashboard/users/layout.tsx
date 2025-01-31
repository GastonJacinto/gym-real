import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Usuarios',
  description: 'Panel de control para la gestión del gimnasio',
};

export default async function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
