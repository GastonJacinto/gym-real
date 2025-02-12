'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DynamicField } from './components';
import {
  LayoutType,
  UseFormStepsProps,
  UseMultiFormStepsReturn,
} from '@/types/form-types';
import { getInitialValues } from './functions';
import { Formik, FormikErrors, FormikTouched } from 'formik';
import { toast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import IsSubmitting from './is-submitting';

export function DraftForm({
  layout,
  base,
  onSaveFn,
  onCompleteFn,
  afterCompleteFn,
  ...props
}: {
  layout: LayoutType;
  base: {};
  onSaveFn?: (formData: FormData) => Promise<string>;
  onCompleteFn: (formData: FormData) => Promise<string>;
  afterCompleteFn?: (values: any) => Promise<void>;
  [key: string]: any;
}) {
  const [values, setValues] = React.useState(base);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const steps = layout;

  const { currentStep, isLastStep, goToNext, goToPrevious } = useMultiStepForm({
    initialSteps: steps,
    onStepValidation: async () => {
      return true;
    },
  });
  return (
    <div>
      <Formik
        onSubmit={async (newValues, actions) => {
          setIsSubmitting(true);
          setValues((prevValues: any) => ({
            ...prevValues,
            ...newValues,
          }));
          const updatedValues = { ...values, ...newValues };
          const formData = new FormData();
          formData.append('values', JSON.stringify(updatedValues));
          formData.append('page', currentStep.toString());

          if (props?.additional_info) {
            formData.append(
              'additional_info',
              JSON.stringify(props?.additional_info)
            );
          }
          Object.keys(updatedValues).forEach((key) => {
            const fieldValue = updatedValues[key];
            if (Array.isArray(fieldValue)) {
              fieldValue.forEach((fileObj, index) => {
                if (fileObj && fileObj instanceof File) {
                  formData.append(`${key}[${index}]`, fileObj);
                }
              });
            } else if (fieldValue && fieldValue instanceof File) {
              formData.append(key, fieldValue);
            }
          });
          try {
            if (onSaveFn) await onSaveFn(formData);
            if (isLastStep) {
              const response = await onCompleteFn(formData);
              if (afterCompleteFn) await afterCompleteFn(updatedValues);
              if (response && typeof response == 'string') {
                toast({
                  title: 'Success',
                  description: response,
                });
              }
            } else {
              goToNext();
            }
          } catch (error: any) {
            toast({
              title: 'Error',
              description: error?.message,
              variant: 'destructive',
            });
            return;
          } finally {
            actions.setSubmitting(false);
            setIsSubmitting(false);
          }
        }}
        initialValues={getInitialValues(layout, values)}
        enableReinitialize={false}
      >
        {({ handleSubmit, values, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <MultiStepViewer
              currentStep={currentStep}
              isLastStep={isLastStep}
              goToPrevious={goToPrevious}
              steps={steps}
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting}
              values={values}
              layout={layout}
            />
          </form>
        )}
      </Formik>
    </div>
  );
}

export function MultiStepViewer({
  layout,
  values,
  isSubmitting,
  touched,
  errors,
  currentStep,
  isLastStep,
  goToPrevious,
  steps,
}: {
  values: any;
  layout: LayoutType;
  isSubmitting: boolean;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  currentStep: number;
  isLastStep: boolean;
  steps: LayoutType;
  goToPrevious: () => void;
}) {
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
          className="flex flex-col gap-2 "
        >
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {steps[currentStep - 1].fields.map((field, index) => (
            <DynamicField
              errors={errors}
              touched={touched}
              values={values}
              key={`field-${index}`}
              field={field}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-row justify-between gap-3 w-full pt-3">
        <Button
          size="sm"
          variant="secondary"
          onClick={goToPrevious}
          type="button"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>
        {isLastStep && (
          <IsSubmitting isSubmitting={isSubmitting}>
            Confirmar
            <PaperPlaneIcon className="mr-2 h-4 w-4" />
          </IsSubmitting>
        )}
        {!isLastStep && (
          <Button size="sm" type="submit" variant="secondary">
            Siguiente
            <ChevronRight className="mr-2 h-4 w-4" />
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
  errors,
}: {
  steps: LayoutType;
  errors: FormikErrors<any>;
  currentStep: number;
}) {
  const step = steps[currentStep - 1]; // Obtiene el paso actual

  const stepFieldNames = step.fields.flatMap((field) =>
    Array.isArray(field) ? field.map((f) => f.name) : field.name
  );

  // Filtra los errores solo de los campos del paso actual
  const stepErrors = Object.keys(errors).filter((key) =>
    stepFieldNames.includes(key)
  );

  return stepErrors.length === 0;
}
