'use client';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import CustomBreadcrum from '@/components/shared/custom-breadcrum';
import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import { useManagerStore } from '@/stores/manager-store';
import { useUserStore } from '@/stores/user-store';
import { Manager, User } from '@/types/db-types';
import React from 'react';

export default function PrincingDashboard({
  plansData,
}: {
  plansData: any[] | null;
}) {
  const setManager = useManagerStore((state) => state.setManager);

  const plans = useUserStore((state) => state.users);
  React.useEffect(() => {
    // if (!plans.length && plansData) setManager(plansData);
  }, [, plans]);

  return (
    <ContentLayout title="Dashboard">
      <CustomBreadcrum
        items={[
          { label: 'Inicio', href: '/dashboard' },
          { label: 'Planes y Precios' },
        ]}
      />
    </ContentLayout>
  );
}
