'use client';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import DashboardWrapper from '@/components/artifacts/wrappers/dashboard-wrapper';
import CustomBreadcrum from '@/components/shared/custom-breadcrum';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import ActivityCard from '@/components/ui/dashboard/activity-card';
import GeneralInfoCard from '@/components/ui/dashboard/general-info-card';
import WeeklyClassAttendanceCard from '@/components/ui/dashboard/weekly-class-atendance';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import { useManagerStore } from '@/stores/manager-store';
import { useUserStore } from '@/stores/user-store';
import { Manager, Plan, User, UserWithProfile } from '@/types/db-types';
import { Label } from '@radix-ui/react-label';
import { Activity, DollarSign, Users, Dumbbell } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const activities = [
  { type: 'join', message: 'New member John Doe joined', time: '2m ago' },
  {
    type: 'booking',
    message: 'Yoga class at 6 PM is fully booked',
    time: '1h ago',
  },
  {
    type: 'maintenance',
    message: 'Equipment maintenance scheduled',
    time: '3h ago',
  },
  {
    type: 'reminder',
    message: 'Membership renewal reminder sent',
    time: '5h ago',
  },
];

const classAttendanceData = [
  { name: 'Mon', total: 75 },
  { name: 'Tue', total: 82 },
  { name: 'Wed', total: 93 },
  { name: 'Thu', total: 89 },
  { name: 'Fri', total: 78 },
  { name: 'Sat', total: 110 },
  { name: 'Sun', total: 65 },
];
export default function GeneralDashboard({
  managerData,
  usersData,
}: {
  managerData: Manager;
  usersData: UserWithProfile[] | null;
  planData: Plan[] | null;
}) {
  const setManager = useManagerStore((state) => state.setManager);
  const setUsers = useUserStore((state) => state.setUsers);

  const users = useUserStore((state) => state.users);
  const manager = useManagerStore((state) => state.manager);
  React.useEffect(() => {
    if (managerData && !manager) setManager(managerData);
    if (usersData && !users?.length) setUsers(usersData);
  }, [managerData, usersData]);
  const data = [
    {
      title: 'Usuarios',
      value: `${users.length}`,
      description: 'Usuarios Totales',
      icon: Users,
    },
    {
      title: 'Ganancias Mensuales',
      value: '$24,560',
      description: '+5% from last month',
      icon: DollarSign,
    },
    {
      title: 'Active Classes',
      value: '45',
      description: '5 new classes added',
      icon: Dumbbell,
    },
    {
      title: ' Avg. Daily Attendance',
      value: '312',
      description: '+5% from last week',
      icon: Activity,
    },
  ];
  return (
    <ContentLayout title="Dashboard">
      <CustomBreadcrum
        items={[
          { label: 'Inicio', href: '/dashboard' },
          { label: 'Dashboard' },
        ]}
      />

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
          {data?.map((info) => <GeneralInfoCard key={info.title} {...info} />)}
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
          <ActivityCard title="Actividades Recientes" activities={activities} />

          <WeeklyClassAttendanceCard
            title="Asistencia Semanal"
            data={classAttendanceData}
          />
        </div>
      </div>
    </ContentLayout>
  );
}
