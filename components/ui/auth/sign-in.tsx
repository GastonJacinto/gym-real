'use client';
import Link from 'next/link';
import { handleRequestFn } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
// import OauthSignIn from './OauthSignIn';
import AuthForm from '@/components/ui/auth/auth-form';
import { getURL } from '@/utils/helpers';
import signin_layout from '@/form-layouts/signin-layout.json';
import OauthSignIn from '@/components/ui/auth/oauth';
import { signInWithPassword } from '@/utils/auth-helpers/server';
// Define prop type with allowEmail boolean
interface PasswordSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowPassword,
  redirectMethod = 'client',
}: PasswordSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;

  const handleSubmit = async (formData: FormData) => {
    await handleRequestFn(formData, signInWithPassword, router);
  };

  return (
    <div className="space-y-4">
      <AuthForm
        layout={signin_layout}
        saveFn={() => {}}
        submitButton={'Login'}
        view={'signin'}
        completeFn={handleSubmit}
        base={{}}
        lang="en"
      />
      <div className="divider ">o</div>
      <OauthSignIn action={'Sign in'} />
      <h3 className="font-semibold text-xs text-center">
        Aún no tienes una cuenta?{' '}
        <Link className="text-blue-500" href={getURL('/sign-in/sign-up')}>
          Registrarme
        </Link>
      </h3>
    </div>
  );
}
