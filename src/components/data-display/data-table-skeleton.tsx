import { Skeleton } from '@/components/ui/skeleton'

export function DataTableSkeleton() {
  return (
    <div className="mt-10 space-y-5">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border-border bg-card rounded-lg border p-4 shadow-xs"
          >
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="bg-muted h-4 w-28" />
              <Skeleton className="bg-muted h-5 w-10 rounded-md" />
            </div>
            <Skeleton className="bg-muted mb-6 h-8 w-24" />
            <div className="flex-col items-start gap-1.5">
              <div className="flex items-center gap-2">
                <Skeleton className="bg-muted h-3 w-20" />
                <Skeleton className="bg-muted h-3 w-3 rounded-full" />
              </div>
              <Skeleton className="bg-muted mt-1 h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
      <div className="block space-y-3 md:flex md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-col gap-3 md:flex-row">
          <Skeleton className="bg-muted h-8 w-full md:w-42.5" />
          <Skeleton className="bg-muted h-8 w-full md:w-42.5" />
        </div>
        <Skeleton className="bg-muted h-8 w-full md:w-42.5" />
      </div>
      <div className="border-border divide-border w-full flex-col divide-y overflow-hidden rounded-lg border">
        <div className="bg-muted h-10 w-full" />
        <div className="bg-card divide-border grid grid-cols-8 divide-x divide-y">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="p-2">
              <Skeleton className="bg-muted h-6 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
