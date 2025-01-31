'use client';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import CustomBreadcrum from '@/components/shared/custom-breadcrum';
import PricingCards from '@/components/ui/pricing-card';
import { PricingCardSkeleton } from '@/components/ui/skeletons/pricing-card-skeleton';
import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import { useManagerStore } from '@/stores/manager-store';
import { usePlanStore } from '@/stores/plans-store';
import { useUserStore } from '@/stores/user-store';
import { Manager, User } from '@/types/db-types';
import React from 'react';

export default function PrincingDashboard({
  plansData,
}: {
  plansData: any[] | null;
}) {
  const setPlans = usePlanStore((state) => state.setPlans);
  const [isHidrated, setIsHidrated] = React.useState(false);
  const plans = usePlanStore((state) => state.plans);
  React.useEffect(() => {
    if (!plans.length && plansData) {
      setPlans(plansData);
      setIsHidrated(true);
    }
  }, []);

  return (
    <ContentLayout title="Precios y Planes">
      <CustomBreadcrum
        items={[
          { label: 'Inicio', href: '/dashboard' },
          { label: 'Planes y Precios' },
        ]}
      />
      <div className="grid gap-x-4 grid-cols-1 gap-y-4 md:grid-cols-3 ">
        {plans.length > 0 || isHidrated
          ? plans.map((plan) => (
              <PricingCards key={plan.title} plan={plan} allowEdit />
            ))
          : Array.from({ length: 3 }).map((_, index) => (
              <PricingCardSkeleton key={index} />
            ))}
      </div>
    </ContentLayout>
  );
}
