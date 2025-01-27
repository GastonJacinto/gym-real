import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { BarChart } from '../charts/bar-chart';

type Props = {
  title: string;
  data: { name: string; total: number }[];
};

export default function WeeklyClassAttendanceCard({ title, data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <BarChart data={data} yAxisWidth={30} />
    </Card>
  );
}
