import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { usePlanStore } from '@/stores/plans-store';
import type { Plan } from '@/types/db-types';
import { DraftForm } from '../form/custom-form';
import edit_plan_layout from '@/form-layouts/edit-plan-layout.json';
import { generateZodSchema } from '@/schemas/edit-plan';
import * as z from 'zod';
interface EditPlanModalProps {
  plan: Plan;
  isOpen: boolean;
  onClose: () => void;
}

export function EditPlanModal({ plan, isOpen, onClose }: EditPlanModalProps) {
  const [editedPlan, setEditedPlan] = useState<Plan>(plan);
  const updatePlan = usePlanStore((state) => state.updatePlan);
  const schema = generateZodSchema(edit_plan_layout);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          aria-describedby="edit-plan-modal"
          className="sm:max-w-[425px] "
        >
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl">
              Editar Plan: {plan.title}
            </DialogTitle>
          </DialogHeader>
          <DraftForm
            base={{
              ...editedPlan,
              features_length: editedPlan?.features?.length,
            }}
            schema={schema}
            layout={edit_plan_layout}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

{
  /*
<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl md:text-2xl">
            Editar Plan: {plan.title}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label aria-required htmlFor="title">
                Título
              </Label>
              <Input
                id="title"
                name="title"
                required
                value={editedPlan.title}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                required
                name="description"
                value={editedPlan.description}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                name="price"
                required
                type="number"
                value={editedPlan.price}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Características</Label>
              <div className="space-y-2"></div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button type="submit" className="w-full sm:w-auto">
              Guardar cambios
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  */
}
