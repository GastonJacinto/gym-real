'use client';

import AuthForm from '@/components/ui/auth/auth-form';
import { handleRequestFn } from '@/utils/auth-helpers/client';
import { getURL } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import forgot_password_layout from '@/form-layouts/forgot-password-layout.json';
import { requestPasswordUpdate, signUp } from '@/utils/auth-helpers/server';
import Link from 'next/link';
interface ForgotPasswordProps {
  allowEmail: boolean;
  redirectMethod: string;
}
export default function ForgotPassword({
  allowEmail,
  redirectMethod,
}: ForgotPasswordProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;

  const handleSubmit = async (formData: FormData) => {
    await handleRequestFn(formData, requestPasswordUpdate, router);
  };
  return (
    <>
      <>
        <div className="space-y-4">
          <AuthForm
            layout={forgot_password_layout}
            saveFn={() => {}}
            submitButton={'Reiniciar contraseña'}
            completeFn={handleSubmit}
            base={{}}
            lang="en"
          />
          <div className="divider ">o</div>
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
    </>
  );
}
