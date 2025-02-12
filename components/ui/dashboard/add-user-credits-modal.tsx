import { CustomModal } from '@/components/shared/custom-modal';

import type { UserWithProfile } from '@/types/db-types';
import { getPersonFullName } from '@/utils/helpers';
import { Coins } from 'lucide-react';
import { DraftForm } from '../form/custom-form';
import { addCreditsToUser } from '@/lib/forms/add-user-credits';
import { useUserStore } from '@/stores/user-store';
import add_credits_layout from '@/form-layouts/add-credits-layout.json';
interface EditPlanModalProps {
  user: UserWithProfile;
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddUserCreditsModal({
  user,
  isOpen,
  onOpenChange,
}: EditPlanModalProps) {
  const updateUsers = useUserStore((state) => state.updateUsers);
  return (
    <>
      <CustomModal
        confirmFn={async () => {}}
        footer={false}
        icon={<Coins />}
        title={`Agregar créditos a 
              ${getPersonFullName(user?.first_name, user?.last_name)}`}
        open={isOpen}
        onOpenChange={onOpenChange}
      >
        <DraftForm
          key={user?.id}
          onCompleteFn={addCreditsToUser}
          afterCompleteFn={async (values: any) => {
            const { credits, id, plan } = values;
            await updateUsers({
              ...user,
              profiles: { ...user.profiles, credits },
            });
            onOpenChange(false);
          }}
          base={{
            user_id: user?.id,
          }}
          layout={add_credits_layout}
        />
      </CustomModal>
    </>
  );
}
