import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

export function AuthSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-9 w-40" />
        <Skeleton className="mt-1 h-4 w-60" />
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-12 w-full rounded-md" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-48" />
            <div className="flex items-center gap-2">
              <div className="flex flex-1 gap-1">
                <Skeleton className="h-12 flex-1 rounded-md" />
                <Skeleton className="h-12 flex-1 rounded-md" />
                <Skeleton className="h-12 flex-1 rounded-md" />
              </div>
              <div className="flex flex-1 gap-1">
                <Skeleton className="h-12 flex-1 rounded-md" />
                <Skeleton className="h-12 flex-1 rounded-md" />
                <Skeleton className="h-12 flex-1 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex w-full flex-col items-center">
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="mt-3 h-4 w-28" />
        </div>
      </CardFooter>
    </Card>
  )
}
