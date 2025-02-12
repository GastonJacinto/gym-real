'use client';
import React from 'react';

import { Formik } from 'formik';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Info,
  LoaderCircle,
  Send,
  SendIcon,
} from 'lucide-react';
import Link from 'next/link';
import { getURL } from '@/utils/helpers';
import { getInitialValues } from '../form/functions';
import { toast } from '@/hooks/use-toast';
import { Button } from '../button';
import { SubmitButton } from '@/components/submit-button';
import { DynamicField } from '../form/components';
import { DynamicFieldType } from '@/types/form-types';
type Props = {
  layout: any;
  lang: 'fr' | 'en';
  saveFn: any;
  completeFn: any;
  base: any;
  view?: string;
  submitButton?: string;
  OAuthComponent?: React.ReactNode;
  submitButtonIcon?: React.ReactElement;
};

export default function AuthForm({
  layout,
  lang = 'en',
  saveFn,
  completeFn,
  base,
  view,
  submitButtonIcon = <Send className="w-4 h-4" />,
  submitButton = 'Submit',
}: Props) {
  const [page, setPage] = React.useState(0);
  const [values, setValues] = React.useState(base);
  const [complete, setComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const prevPage = (prevValues: any) => {
    //I save the values again after going back to avoid losing data in the form.
    setValues((currentValues: any) => {
      return {
        ...currentValues,
        ...prevValues,
      };
    });
    setPage((p) => p - 1);
  };
  return (
    <div
      className={`w-full flex-col flex items-center justify-center z-[10] `}
      key={'auth-form'}
    >
      {layout?.map(
        (
          {
            title,
            fields,
          }: {
            title?: string;
            fields: DynamicFieldType[];
          },
          i: number
        ) =>
          page == i && (
            <Formik
              initialValues={getInitialValues(layout, values)}
              enableReinitialize={false}
              onSubmit={async (newValues, actions) => {
                setIsLoading(true);
                setValues((prevValues: any) => ({
                  ...prevValues,
                  ...newValues,
                }));
                const updatedValues = { ...values, ...newValues };
                const formData = new FormData();
                formData.append('values', JSON.stringify(updatedValues));
                formData.append('page', page.toString());
                try {
                  await saveFn(formData);
                  if (page == layout.length - 1) {
                    await completeFn(formData);
                    // setComplete(true);
                    return;
                  } else {
                    setPage((p) => p + 1);
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
                  setIsLoading(false);
                }
              }}
            >
              {({ handleSubmit, values, errors, touched }) => (
                <form
                  key={'formPage' + i}
                  className={` w-full basis-full flex max-w-[660px] flex-col  z-10 gap-y-4 `}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  {title && (
                    <h3 className="font-semibold w-full flex gap-2 items-center text-foreground pl-2 border-l-2 border-foreground">
                      <span> {title}</span>
                    </h3>
                  )}
                  <div
                    key={'formFields' + i}
                    className="flex gap-y-4 basis-full flex-wrap"
                  >
                    {fields?.map((field: DynamicFieldType) => {
                      return (
                        <DynamicField
                          errors={errors}
                          touched={touched}
                          field={field}
                          values={values}
                        />
                      );
                    })}
                  </div>
                  {view == 'signin' && (
                    <>
                      <Link
                        className=" text-xs text-end text-blue-500"
                        href={getURL('/sign-in/forgot-password')}
                      >
                        Forgot your password?
                      </Link>
                    </>
                  )}

                  <div className="flex gap-4">
                    {!complete && i > 0 && (
                      <Button
                        className="bg-primary w-full"
                        onClick={() => prevPage(values)}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Anterior
                      </Button>
                    )}

                    <SubmitButton
                      className="bg-primary w-full"
                      disabled={isLoading || complete}
                    >
                      {!isLoading && (
                        <>
                          {i == layout.length - 1
                            ? lang == 'en'
                              ? submitButton
                              : 'Soumettre'
                            : lang == 'en'
                              ? 'Siguiente'
                              : 'Suivant'}

                          {i == layout.length - 1 ? (
                            <SendIcon className="w-4 h-4 animate-pulse" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </>
                      )}
                      {isLoading && (
                        <>
                          <LoaderCircle className="w-4 h-4 animate-spin" />
                          <p>{lang == 'en' ? 'Espera...' : 'Chargement'}</p>
                        </>
                      )}
                    </SubmitButton>
                  </div>
                </form>
              )}
            </Formik>
          )
      )}
    </div>
  );
}
