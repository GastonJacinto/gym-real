import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PricingCardSkeleton() {
  return (
    <Card className="w-full md:max-w-sm flex flex-col">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>
        <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-4 w-5/6 mx-auto" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-12 w-1/2 mx-auto mb-6" />
        <div className="space-y-2">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center">
              <Skeleton className="w-5 h-5 mr-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
