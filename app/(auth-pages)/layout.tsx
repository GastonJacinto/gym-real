import AuthFormLayout from '@/components/shared/wrappers/auth-form-wrapper';
import { blackBikeUrl } from '@/public';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthFormLayout bgImage={blackBikeUrl}>{children}</AuthFormLayout>;
}
