import { Skeleton } from './ui/skeleton'

export function DataTableSkeleton() {
  return (
    <>
      <div className="mt-10 mb-4 flex flex-col gap-3 md:flex-row">
        <Skeleton className="bg-muted h-8 w-full md:w-42.5" />
        <Skeleton className="bg-muted h-8 w-full md:w-42.5" />
      </div>
      <div className="border-border divide-border w-full flex-col divide-y overflow-hidden rounded-lg border">
        <div className="bg-muted h-10 w-full" />
        <div className="bg-card divide-border grid grid-cols-8 divide-x divide-y">
          {Array.from({ length: 24 }).map((item, i) => (
            <div key={i} className="p-2">
              <Skeleton className="bg-muted h-6 w-full" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
