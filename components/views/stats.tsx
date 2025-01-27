'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { subtitle, title } from '../artifacts/primitives';

const stats = [
  { title: 'Bicicletas vendidas', value: '240+' },
  {
    title: 'Reparaciones, servicios y restauraciones realizadas',
    value: '450+',
  },
  { title: 'Años de experiencia', value: '4+' },
];
export default function ssView({}: any) {
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 min-h-[70vh]">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, type: 'spring', stiffness: 50 }}
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            className={title({ size: 'sm' })}
          >
            ¿Por qué{' '}
            <p className={title({ size: 'sm', color: 'green' })}>confiar</p> en
            nosotros?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
              type: 'spring',
              stiffness: 50,
            }}
            whileInView="animate"
            viewport={{ once: true, amount: 0.5 }}
            className={` ${subtitle({ color: 'foreground' })} `}
          >
            Porque en cada pedalada ponemos nuestro corazón y nuestra pasión
            para ofrecerte lo mejor.
          </motion.p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x dark:sm:divide-gray-100 sm:divide-gray-400">
            {stats?.map((stat: any) => (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  type: 'spring',
                  stiffness: 50,
                }}
                whileInView="animate"
                viewport={{ once: true, amount: 0.5 }}
                className="flex flex-col px-4 py-8 text-center group cursor-default"
              >
                <dt className="order-last text-lg font-medium text-gray-500">
                  {stat.title}
                </dt>

                <dd
                  className={title({
                    color: 'green',
                    className: 'group-hover:scale-105 transition-all ',
                  })}
                >
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
