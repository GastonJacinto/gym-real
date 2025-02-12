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
interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;

  const handleSubmit = async (formData: FormData) => {
    await handleRequestFn(formData, signUp, router);
  };
  const saveFn = async (formData: FormData) => {
    //This is to simulate a save function that takes time.
    await new Promise((resolve) => setTimeout(resolve, 500));
  };
  return (
    <>
      <div className="space-y-4">
        <AuthForm
          layout={sign_up_layout}
          saveFn={saveFn}
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
          <Link
            className="text-blue-500"
            href={getURL('/sign-in/password-signin')}
          >
            Iniciar sesión
          </Link>
        </h3>
      </div>
    </>
  );
}
