import { Separator } from '@/components/ui/separator';

export default function DashboardWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="space-y-6 w-full px-8 pt-1">
      <div className="flex flex-col space-y-2 md:space-y-4">
        <Separator className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-1 rounded-full w-1/4 mx-auto" />
        <h1 className="text-3xl font-bold text-center">{title}</h1>
      </div>
      <h1 className="text-3xl font-bold"></h1>
      <Separator />
      {children}
    </div>
  );
}
