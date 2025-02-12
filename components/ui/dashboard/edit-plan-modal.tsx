import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePlanStore } from '@/stores/plans-store';
import type { Plan } from '@/types/db-types';
import { DraftForm } from '../form/custom-form';
import edit_plan_layout from '@/form-layouts/edit-plan-layout.json';
import { editPrincingPlan } from '@/lib/forms/pricing';
import { CustomModal } from '@/components/shared/custom-modal';
import { Settings2 } from 'lucide-react';

interface EditPlanModalProps {
  plan: Plan;
  isOpen: boolean;
  onClose: () => void;
}

export function EditPlanModal({ plan, isOpen, onClose }: EditPlanModalProps) {
  const updatePlan = usePlanStore((state) => state.updatePlan);
  return (
    <>
      <CustomModal
        confirmFn={async () => {}}
        footer={false}
        icon={<Settings2 />}
        title={`Editar Plan: ${plan.title}`}
        open={isOpen}
        onOpenChange={onClose}
      >
        <DraftForm
          key={plan?.id}
          onCompleteFn={editPrincingPlan}
          afterCompleteFn={async (values: any) => {
            await updatePlan({ ...plan, ...values });
            onClose();
          }}
          base={{
            ...plan,
          }}
          layout={edit_plan_layout}
        />
      </CustomModal>
    </>
  );
}
