'use client';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import { Box, ShieldQuestion } from 'lucide-react';
import { BlurIn } from './framer/blur-in-text';
import { TypingEffect } from './framer/typing-effect';
import { logo2 } from '@/public';
import { motion } from 'framer-motion';
import { title } from './artifacts/primitives';
const images = [
  'https://res.cloudinary.com/db7wpgkge/image/upload/v1725318606/puntoventasm/bt130dnnhyf1dmdddcfl.jpg',
  'https://res.cloudinary.com/db7wpgkge/image/upload/v1725318604/puntoventasm/ewutvnbvkfoi2vwxfe9o.jpg',
  'https://res.cloudinary.com/db7wpgkge/image/upload/v1725318601/puntoventasm/i21diokzdpcxnfsnglnm.jpg',
  'https://res.cloudinary.com/db7wpgkge/image/upload/v1725317607/puntoventasm/kfcom0fjwkbh0oqs6eqk.jpg',
  'https://res.cloudinary.com/db7wpgkge/image/upload/v1725317606/puntoventasm/qb4nzg7fv3exrbevucgl.jpg',
];

export default function Header() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-16 min-h-[70vh] items-center">
      <div className="flex flex-col gap-6 items-center">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 50 }}
          src={logo2}
          alt="logo"
          className="w-24 h-24 hover:scale-105 transition-all duration-300 ease-in-out"
        />
        <BlurIn className={title({ color: 'green' })}>Punto de Venta</BlurIn>
        <div className="inline-block max-w-lg text-center mt-2 justify-center">
          <motion.h1
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className={title({ size: 'sm' })}
          >
            Rodando hacia
          </motion.h1>
          <br />

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={title({ size: 'sm', color: 'green' })}
          >
            momentos mágicos.
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8"
        />

        <div className="flex gap-8 justify-center items-center">
          <Link
            href={'/products'}
            className={`${buttonVariants({ variant: 'outline' })} `}
          >
            <Box />
            Nuestros productos
          </Link>
          <span className="border-l rotate-45 h-6 border-gray-700/50" />{' '}
          <Link
            href={'#about'}
            className={`${buttonVariants({ variant: 'outline' })} `}
          >
            <ShieldQuestion />
            ¿Quienes somos?
          </Link>
        </div>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full "
      >
        <CarouselContent>
          {Array.from(images).map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="max-h-[60vh] rounded-md overflow-hidden">
                <Image
                  src={image}
                  alt="image"
                  width={500}
                  height={250}
                  className="object-cover w-full h-[300px]"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
