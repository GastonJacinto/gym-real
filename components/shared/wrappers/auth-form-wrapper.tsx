'use client';
import { GalleryVerticalEnd } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
  bgImage: string;
};

export default function AuthFormLayout({ children, bgImage }: Props) {
  const path = usePathname();
  const title = getTitle(path);
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Olimpo
          </a>
        </div>
        <div className="flex flex-1 flex-col items-center gap-y-10 justify-center">
          <h1 className="font-fustat font-bold text-3xl capitalize leading-[45px] ">
            {title}
          </h1>
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={bgImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

const getTitle = (path: string) => {
  switch (path) {
    case '/sign-in':
      return 'Iniciar Sesión';
    case '/sign-up':
      return 'Registrarme';
    case '/forgot-password':
      return 'Recuperar Contraseña';
    default:
      return 'Cambiar Contrase{a';
  }
};
