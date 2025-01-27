import { cn } from '@/lib/utils';
import { card_variants_svgs } from '@/public';
const cardContent = {
  title: 'Lorem ipsum dolor',
  description:
    'Lorem ipsum dolor, sit amet elit consectetur adipisicing. Nostrum, hic ipsum! dolor, sit amet elit consectetur amete elite!',
};

export const CardBody = ({ className = '' }) => (
  <div className={cn('text-start p-4 md:p-6', className)}>
    <h3 className="text-lg font-bold mb-1 text-zinc-200">
      {cardContent.title}
    </h3>
    <p className="text-wrap text-zinc-500 text-sm">{cardContent.description}</p>
  </div>
);
//======================================
export const CustomCardWithPattern = ({
  children,
  variant = 'circle_ellipsis',
}: {
  children: React.ReactNode;
  variant?: keyof typeof card_variants_svgs;
}) => {
  const url = card_variants_svgs[variant];
  return (
    <div className="border w-full rounded-md overflow-hidden dark:border-zinc-900 bg-zinc-950">
      <div
        style={{
          backgroundImage: `url(${url})`,
        }}
        className={`size-full bg-repeat bg-[length:95px_95px]`}
      >
        <div className="size-full bg-gradient-to-tr from-zinc-950 via-zinc-950/[0.93] to-zinc-950">
          {children}
        </div>
      </div>
    </div>
  );
};
