import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../card';

const getDotColor = (type: string) => {
  switch (type) {
    case 'join':
      return 'bg-green-500';
    case 'booking':
      return 'bg-yellow-500';
    case 'maintenance':
      return 'bg-blue-500';
    case 'reminder':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

type Activity = {
  type: string;
  message: string;
  time: string;
};

type Props = {
  title: string;
  activities: Activity[];
};

export default function ActivityCard({ title, activities = [] }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-center">
              <span
                className={`h-2 w-2 rounded-full mr-2 ${getDotColor(activity.type)}`}
              ></span>
              <span className="flex-1">{activity.message}</span>
              <span className="text-muted-foreground">{activity.time}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
