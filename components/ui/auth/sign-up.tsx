'use client';
import Link from 'next/link';
import AuthForm from '@/components/ui/auth/auth-form';
import { handleRequestFn } from '@/utils/auth-helpers/client';
import OauthSignIn from '@/components/ui/auth/oauth';
import { getURL } from '@/utils/helpers';
import { signUp } from '@/utils/auth-helpers/server';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import sign_up_layout from '@/form-layouts/sign-up-layout.json';
interface SignupProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod,
}: SignupProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;

  // const searchParams = await props.searchParams;
  // if ("message" in searchParams) {
  //   return (
  //     <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
  //       <FormMessage message={searchParams} />
  //     </div>
  //   );
  // }
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequestFn(formData, signUp, router);
    setIsSubmitting(false);
  };
  return (
    <>
      <div className="space-y-4">
        <AuthForm
          layout={sign_up_layout}
          saveFn={() => {}}
          submitButton={'Registrarse'}
          view={'signup'}
          completeFn={handleSubmit}
          base={{}}
          lang="en"
        />
        <div className="divider ">o</div>
        <OauthSignIn action={'Sign up'} />
        <h3 className="font-semibold text-xs text-center">
          Ya tienes una cuenta?{' '}
          <Link className="text-blue-500" href={getURL('/sign-in')}>
            Iniciar sesión
          </Link>
        </h3>
      </div>
    </>
  );
}
