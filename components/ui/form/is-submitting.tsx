import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { Button } from '../button';

type Props = {
  children: React.ReactNode;
  isSubmitting: boolean;
};

export default function IsSubmitting({ children, isSubmitting }: Props) {
  if (!isSubmitting) return <Button size={'sm'}>{children}</Button>;
  return (
    <Button disabled variant="secondary">
      <p>Espera...</p>
      <LoaderCircle className="animate-spin" />
    </Button>
  );
}
