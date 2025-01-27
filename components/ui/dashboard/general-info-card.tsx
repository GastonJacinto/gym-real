import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { card_variants_svgs } from '@/public';

type Props = {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant?: keyof typeof card_variants_svgs;
};

export default function GeneralInfoCard({
  title,
  value,
  description,
  icon: Icon,
  variant = 'ellipsis',
}: Props) {
  const url = card_variants_svgs[variant];
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
