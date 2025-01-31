'use client';

import * as z from 'zod';
import React, { useState, useCallback } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { serverAction } from './actions/server-action';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { DynamicField } from './components';
import {
  LayoutType,
  UseFormStepsProps,
  UseMultiFormStepsReturn,
} from '@/types/form-types';
import { ActionResponse } from './form-schemas';

export function DraftForm({
  layout,
  base,
  schema,
}: {
  layout: LayoutType;
  base: {};
  schema: z.ZodSchema;
}) {
  const form = useForm<z.infer<typeof schema>>({
    mode: 'onBlur', // Validate on touch
    resolver: zodResolver(schema),
    defaultValues: {
      ...base,
    },
  });
  const initialState = {
    success: false,
    message: '',
    schema,
  };
  const [state, action, isPending] = React.useActionState(
    serverAction,
    initialState
  );
  return (
    <div>
      <Form {...form}>
        <form
          action={action}
          className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl  border"
        >
          <MultiStepViewer
            schema={schema}
            form={form}
            state={state}
            isPending={isPending}
            layout={layout}
          />
        </form>
      </Form>
    </div>
  );
}

export function MultiStepViewer({
  form,
  layout,

  schema,
  state,
  isPending,
}: {
  form: UseFormReturn<z.infer<typeof schema>>;
  layout: LayoutType;
  schema: z.ZodSchema;
  state: ActionResponse | null;
  isPending: boolean;
}) {
  const steps = layout;
  const { currentStep, isLastStep, goToNext, goToPrevious } = useMultiStepForm({
    initialSteps: steps,
    onStepValidation: async () =>
      await validateCurrentStep({
        steps,
        currentStep,
        form,
      }),
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;
  const values = watch();
  const title = steps[currentStep - 1]?.title;
  return (
    <div className="flex flex-col gap-2 ">
      {steps?.length > 1 && (
        <div className="flex-col-start gap-1 mb-4">
          <span>
            Paso {currentStep} de {steps.length}
          </span>
          <Progress value={(currentStep / steps.length) * 100} />
        </div>
      )}

      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="flex flex-col gap-0 "
        >
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {steps[currentStep - 1].fields.map((field, index) => (
            <DynamicField
              values={values}
              key={`field-${index}`}
              form={form}
              field={field}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      {state?.message && <p> {state.message}</p>}
      <div className="flex flex-row justify-between gap-3 w-full pt-3">
        <Button size="sm" variant="ghost" onClick={goToPrevious} type="button">
          Anterior
        </Button>
        {isLastStep && (
          <Button size="sm" type="submit">
            {isPending ? 'Espera...' : 'Confirmar'}
          </Button>
        )}
        {!isLastStep && (
          <Button
            size="sm"
            type="button"
            variant="secondary"
            onClick={goToNext}
          >
            Siguiente
          </Button>
        )}
      </div>
    </div>
  );
}

export function useMultiStepForm({
  initialSteps,
  onStepValidation,
}: UseFormStepsProps): UseMultiFormStepsReturn {
  const steps = initialSteps;
  const [currentStep, setCurrentStep] = useState(1);
  const goToNext = useCallback(async () => {
    const currentStepData = initialSteps[currentStep - 1];

    if (onStepValidation) {
      const isValid = await onStepValidation(currentStepData);
      if (!isValid) return false;
    }

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      return true;
    }
    return false;
  }, [currentStep, steps, onStepValidation, initialSteps]);

  const goToPrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  return {
    steps,
    currentStep,
    currentStepData: steps[currentStep - 1],
    progress: (currentStep / steps.length) * 100,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === steps.length,
    goToNext,
    goToPrevious,
  };
}
async function validateCurrentStep({
  steps,
  currentStep,
  form,
}: {
  steps: LayoutType;
  currentStep: number;
  form: UseFormReturn<any>;
}) {
  const step = steps[currentStep - 1]; // Obtén el paso actual

  // Aplanar los nombres de los campos en caso de que haya campos agrupados (arrays)
  const stepFieldNames = step.fields.flatMap((field) => {
    return Array.isArray(field) ? field.map((f) => f.name) : field.name;
  });
  // Ejecuta trigger para validar solo los campos de este paso
  const isValid = await form.trigger(stepFieldNames);
  return isValid;
}
