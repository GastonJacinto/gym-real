import { Dumbbell, Zap, Trophy, DollarSign, Edit } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePlanStore } from '@/stores/plans-store';
import { Plan } from '@/types/db-types';
import React from 'react';
import { EditPlanModal } from './dashboard/edit-plan-modal';
const iconMap = {
  0: <Dumbbell />,
  1: <Zap />,
  2: <Trophy />,
};
export default function PricingCard({
  plan,
  allowEdit,
  index,
}: {
  plan: Plan;
  allowEdit: boolean;
  index: number;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Card
      key={plan.title}
      className="w-full md:max-w-sm flex flex-col hover:shadow-lg dark:hover:shadow-zinc-800 hover:shadow-zinc-300 duration-500"
    >
      <CardHeader>
        <div className="flex justify-center mb-4">
          {iconMap[index as keyof typeof iconMap] &&
            React.cloneElement(iconMap[index as keyof typeof iconMap], {
              className: 'w-12 h-12 text-primary',
            })}
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          {plan.title}
        </CardTitle>
        <CardDescription className="text-center">
          {plan.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-4xl font-bold text-center mb-6 flex items-center w-full justify-center">
          <DollarSign className="w-8 h-8 text-primary" />
          {plan.price}
          <span className="text-sm font-normal text-primary">/mes</span>
        </p>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {allowEdit ? (
          <>
            <Button onClick={() => setIsOpen(true)} className="w-full">
              <Edit />
              Editar plan
            </Button>
            <EditPlanModal
              plan={plan}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              key={plan.title}
            />
          </>
        ) : (
          <Button className="w-full">Elegir plan</Button>
        )}
      </CardFooter>
    </Card>
  );
}
