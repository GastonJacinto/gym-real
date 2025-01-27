'use client';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import React from 'react';
import { ReusableTable } from '@/components/reusable-table';
import type { Column, Action } from '@/types/table';
import GeneralInfoCard from '@/components/ui/dashboard/general-info-card';
import { Activity, DollarSign, Dumbbell, Users } from 'lucide-react';
import CustomBreadcrum from '@/components/shared/custom-breadcrum';
import { useUserStore } from '@/stores/user-store';
import { mapDataToColumns } from '@/utils/helpers';
const columns: Column[] = [
  { key: 'name', label: 'Usuario', type: 'avatar' },
  { key: 'role', label: 'Role' },
];
const actions: Action[] = [
  {
    label: 'Edit',
    onClick: (item) => console.log('Edit', item),
  },
  {
    label: 'Delete',
    onClick: (item) => console.log('Delete', item),
  },
];

const handleUpdate = () => {
  console.log('Updating table...');
};

export default function UsersPage() {
  const users = useUserStore((state) => state.users);
  const mappedData = mapDataToColumns(users, columns);
  //modal is open
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <ContentLayout title="Usuarios">
      <CustomBreadcrum
        items={[{ label: 'Inicio', href: '/dashboard' }, { label: 'Usuarios' }]}
      />
      <div className="space-y-4">
        <ReusableTable
          title="Usuarios"
          columns={columns}
          data={mappedData}
          actions={actions}
          onUpdate={handleUpdate}
        />
        {
          //modal de edlete
        }
      </div>
    </ContentLayout>
  );
}
