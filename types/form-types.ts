export type LayoutType = FormPageType[];

export type FormPageType = {
  title?: string;
  fields: (DynamicFieldType | DynamicFieldType[])[];
};

export type DynamicFieldType = {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  initial?: string;
  required?: boolean;
  options?: OptionType[];
  icon?: string;
  fieldType?: string;
  hide?: HideType;
  disabled?: boolean;
};

export type HideType = {
  [key: string]: string[];
};
export type OptionType = {
  label: string;
  value: string;
};

export type UseFormStepsProps = {
  initialSteps: LayoutType;
  onStepValidation?: (step: any) => Promise<boolean> | boolean;
};

export type UseMultiFormStepsReturn = {
  steps: any[];

  currentStep: number;

  currentStepData: any;

  progress: number;

  isFirstStep: boolean;

  isLastStep: boolean;

  goToNext: () => Promise<boolean>;

  goToPrevious: () => void;
};

/*

"use client"
import * as z from "zod"
import {
  formSchema
} from '../form-schema'
import {
  serverAction
} from '../actions/server-action'
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  Button
} from "@/components/ui/button"
import {
  useForm
} from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  ToggleGroup,
  ToggleGroupItem
} from '@/components/ui/toggle-group'
import {
  Textarea
} from "@/components/ui/textarea"
import {
  useState,
  useCallback
} from 'react'
import {
  Progress
} from '@/components/ui/progress'
import {
  motion,
  AnimatePresence
} from 'framer-motion'
export function DraftForm() {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const [state, action, isPending] = React.useActionState(serverAction, initialState)

  return (
    <div>
      <Form {...form}>
        <form action={action} className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border">
          <MultiStepViewer form={form} />
          <div className="flex justify-end items-center w-full pt-3">
            <Button className="rounded-lg" size="sm">
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export function MultiStepViewer({
  form,
}: {
  form: any;
}) {
  const stepFormElements: {
    [key: number]: JSX.Element
  } = {
    1: <div><h2 className="text-2xl font-bold">Personal Details</h2>
<p className="text-base">Please provide your personal details</p>
<FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First name</FormLabel> *
                      <FormControl>
                        <Input
                          placeholder="First name"
                          type={"undefined"}
                          value={field.value}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val);
                          }}
                        />
                      </FormControl>
                      
                      <FormMessage />
                  </FormItem>
                  )
                }
              />
,
    2: <div><h2 className="text-2xl font-bold">Contact Information</h2>
<p className="text-base">Please provide your contact information</p>
<FormField
                control={form.control}
                name="your-email"
                render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Your Email</FormLabel> *
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type={"email"}
                          value={field.value}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val);
                          }}
                        />
                      </FormControl>
                      
                      <FormMessage />
                  </FormItem>
                  )
                }
              />
,
   
  };

  const steps = Object.keys(stepFormElements).map(Number);
  const {
    currentStep,
    isLastStep,
    goToNext,
    goToPrevious
  } = useMultiStepForm({
    initialSteps: steps,
    onStepValidation: () => {
      
      return true;
    },
  });
  const current = stepFormElements[currentStep - 1]
  const {
    formState: {
      isSubmitting
    }
  } = form
  return (
    <div className="flex flex-col gap-2 pt-3">
      <div className="flex-col-start gap-1">
        <span className="">
          Step {currentStep} of {steps.length}
        </span>
        <Progress value={(currentStep / steps.length) * 100} />
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="flex flex-col gap-2"
        >
          {current}
        </motion.div>
      </AnimatePresence>
      <div className="flex-row-between gap-3 w-full pt-3">
        <Button size="sm" variant="ghost" onClick={goToPrevious} type="button">
          Previous
        </Button>
        {isLastStep ? (
          <Button size="sm" type="submit">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        ) : (
          <Button
            size="sm"
            type="button"
            variant={'secondary'}
            onClick={goToNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

//------------------------------use-multi-step-form.tsx
type UseFormStepsProps = {
  initialSteps: any[];
  onStepValidation ? : (step: any) => Promise < boolean > | boolean;
};

export type UseMultiFormStepsReturn = {
  steps: any[];

  currentStep: number;

  currentStepData: any;

  progress: number;

  isFirstStep: boolean;

  isLastStep: boolean;

  goToNext: () => Promise < boolean > ;

  goToPrevious: () => void;
};

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
*/
