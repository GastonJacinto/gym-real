import { logo2 } from '@/public';
import Image from 'next/image';
import React from 'react';
import { BlurIn } from '../framer/blur-in-text';
import { subtitle, title } from './primitives';

type Props = {};

export default function Logo({}: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Image src={logo2} width={45} height={45} alt="logo" />
      <BlurIn className={title({ color: 'green', size: 'logo' })}>
        Punto de Venta
      </BlurIn>
    </div>
  );
}
