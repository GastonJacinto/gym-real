'use client';

import * as React from 'react';
import { motion, useInView } from 'framer-motion';

const sizeClasses = {
  xs: 'text-sm text-center sm:text-lg font-bold tracking-tighter md:text-xl md:leading-[2rem]',
  sm: 'text-base text-center sm:text-xl font-bold tracking-tighter md:text-2xl md:leading-[2.5rem]',
  md: 'text-lg text-center sm:text-2xl font-bold tracking-tighter md:text-4xl md:leading-[3rem]',
  lg: 'text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]',
};

export function TypingEffect({
  text = 'Typing Effect',
  size = 'lg',
  className,
}: {
  text: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <h2 ref={ref} className={`${sizeClasses[size]} ${className}`}>
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.2, delay: index * 0.1 }}
        >
          {letter}
        </motion.span>
      ))}
    </h2>
  );
}
