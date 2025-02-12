import AuthFormLayout from '@/components/shared/wrappers/auth-form-wrapper';
import ForgotPassword from '@/components/ui/auth/forgot-password';
import PasswordSignIn from '@/components/ui/auth/sign-in';
import EmailSignIn from '@/components/ui/auth/sign-in';
import SignUp from '@/components/ui/auth/sign-up';
import { blackBikeUrl } from '@/public';
import {
  getAuthTypes,
  getDefaultSignInView,
  getRedirectMethod,
  getViewTypes,
} from '@/utils/auth-helpers/settings';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function Layout({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    disable_button: boolean;
    id: string;
    complete?: string;
    message?: string;
  };
}) {
  const { id } = await params;
  const { id: view, complete, message } = await searchParams;
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();
  let viewProp: string;
  const cookiesO = await cookies();
  if (typeof id === 'string' && viewTypes.includes(id)) {
    viewProp = id;
  } else {
    const preferredSignInView =
      cookiesO.get('preferredSignInView')?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/sign-in/${viewProp}`);
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // const { data: admin } = await supabase
  //   .from('users')
  //   .select()
  //   .eq('id', user?.id || '')
  //   .single();

  // if (admin?.role == 'ADMIN') {
  //   return redirect('/rentscape');
  // }

  const { data: manager } = await supabase
    .from('managers')
    .select()
    .eq('owner', user?.id)
    .single();
  if (user && manager && viewProp !== 'update-password') {
    return redirect('/dashboard/');
  } else if (!user && viewProp === 'update-password') {
    return redirect('/sign-in');
  }
  const title = getTitle({ complete: complete, viewProp });
  return (
    <AuthFormLayout bgImage={blackBikeUrl} title={title}>
      {complete == 'true' && (
        <div className="border-l-2 border-zinc-800 dark:border-zinc-300 pl-4 py-2 ">
          <p className="text-gray-600 dark:text-foreground text-sm">
            {message}
          </p>
        </div>
      )}
      {!complete && (
        <>
          {viewProp === 'password-signin' && (
            <PasswordSignIn
              allowPassword={allowPassword}
              redirectMethod={redirectMethod}
            />
          )}
          {viewProp === 'forgot-password' && (
            <ForgotPassword
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
            />
          )}
          {/* {viewProp === 'update-password' && (
            <UpdatePassword redirectMethod={redirectMethod} />
          )} */}
          {viewProp === 'sign-up' && (
            <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
          )}
        </>
      )}
    </AuthFormLayout>
  );
}
const getTitle = ({
  complete,
  viewProp,
}: {
  complete?: string;
  viewProp: string;
}) => {
  if (complete) {
    return '¡Ya casi está!';
  }
  switch (viewProp) {
    case 'forgot-password':
      return 'Olvidaste tu contraseña?';
    case 'update-password':
      return 'Actualizar contraseña';
    case 'sign-up':
      return 'Registrarme';
    default:
      return 'Iniciar sesión';
  }
};
