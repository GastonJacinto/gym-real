'use client';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import React from 'react';
import { ReusableTable } from '@/components/shared/reusable-table/reusable-table';
import type { Column, Action } from '@/types/table';
import GeneralInfoCard from '@/components/ui/dashboard/general-info-card';
import {
  Activity,
  DollarSign,
  Dumbbell,
  Edit,
  Eye,
  Trash,
  Trash2,
  Users,
} from 'lucide-react';
import CustomBreadcrum from '@/components/shared/custom-breadcrum';
import { useUserStore } from '@/stores/user-store';
import { mapDataToColumns, MappedData } from '@/utils/helpers';
import { CustomModal } from '@/components/shared/custom-modal';
import { User } from '@/types/db-types';
import { deleteUserFn } from '@/lib/functions/dashboard/functions';
import { toast } from '@/hooks/use-toast';
import { AddUserCreditsModal } from '@/components/ui/dashboard/add-user-credits-modal';
const columns: Column[] = [
  { key: 'name', label: 'Usuario', type: 'avatar' },
  { key: 'role', label: 'Rol' },
  { key: 'phone', label: 'Celular' },
  { key: 'dni', label: 'DNI' },
  { key: 'credits', label: 'Creditos Restantes' },
];

const handleUpdate = () => {
  console.log('Updating table...');
};

export default function UsersPage() {
  //Global States
  const users = useUserStore((state) => state.users);
  const removeUserFromList = useUserStore((state) => state.removeUserFromList);
  //Local States
  const [selectedUser, setSelectedUser] = React.useState<MappedData | null>(
    null
  );
  //modal is open
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  //Modal actions
  const actions: Action[] = [
    {
      label: 'View',
      icon: Eye,
      onClick: (item) => {
        console.log('View', item);
      },
    },
    {
      label: 'Edit',
      icon: Edit,
      type: 'edit',
      onClick: (item) => {
        setSelectedUser(item);
        setIsEditModalOpen(true);
      },
    },
    {
      label: 'Delete',
      icon: Trash2,
      type: 'delete',
      onClick: (item) => {
        setSelectedUser(item);
        setIsDeleteModalOpen(true);
      },
    },
  ];
  const handleDeleteUser = async (): Promise<void> => {
    if (!selectedUser) return;
    const response = await deleteUserFn({
      user: selectedUser,
    });
    if (response.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Algo salió mal.',
        description: response.error,
      });
      return;
    }
    removeUserFromList(selectedUser.data.id);
    setSelectedUser(null);
    toast({
      variant: 'default',
      title: 'Usuario eliminado correctamente',
    });
  };
  return (
    <ContentLayout title="Usuarios">
      <CustomBreadcrum
        items={[{ label: 'Inicio', href: '/dashboard' }, { label: 'Usuarios' }]}
      />
      <div className="space-y-4">
        <ReusableTable
          title="Usuarios"
          columns={columns}
          data={mapDataToColumns(users, columns)}
          actions={actions}
          onUpdate={handleUpdate}
        />

        <CustomModal
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          title="¿Estás seguro?"
          description="Esta acción no se puede deshacer."
          confirmFn={handleDeleteUser}
          variant="delete"
          icon={<Trash2 className="h-6 w-6" />}
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
        <AddUserCreditsModal
          onOpenChange={setIsEditModalOpen}
          isOpen={isEditModalOpen}
          user={selectedUser?.data}
        />
      </div>
    </ContentLayout>
  );
}
