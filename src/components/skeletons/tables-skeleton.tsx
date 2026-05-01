import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div className="mt-10 space-y-5">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border-border bg-card flex flex-col gap-6 rounded-lg border p-4 shadow-xs"
          >
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-10 rounded-md" />
            </div>
            <Skeleton className="mb-6 h-8 w-24" />
            <div className="flex-col items-start gap-1.5">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-3 rounded-full" />
              </div>
              <Skeleton className="mt-1 h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
      <div className="block space-y-3 md:flex md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-col gap-3 md:flex-row">
          <Skeleton className="h-8 w-full md:w-42.5" />
          <Skeleton className="h-8 w-full md:w-42.5" />
        </div>
        <Skeleton className="h-8 w-full md:w-42.5" />
      </div>
      <div className="border-border divide-border w-full flex-col divide-y overflow-hidden rounded-lg border">
        <div className="h-10 w-full" />
        <div className="bg-card divide-border grid grid-cols-8 divide-x divide-y">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="p-2">
              <Skeleton className="h-6 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ReportSkeleton() {
  return (
    <div className="mt-10 space-y-5">
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

export function AdminDashboardSkeleton() {
  return (
    <div className="mt-10 space-y-5">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border-border bg-card flex flex-col gap-6 rounded-lg border p-4 shadow-xs"
          >
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-10 rounded-md" />
            </div>
            <Skeleton className="mb-6 h-8 w-24" />
            <div className="flex-col items-start gap-1.5">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-3 rounded-full" />
              </div>
              <Skeleton className="mt-1 h-3 w-32" />
            </div>
          </div>
        ))}
        <div className="border-border bg-card col-span-1 flex flex-col gap-6 rounded-lg border p-4 shadow-xs md:col-span-2">
          <Skeleton className="mb-6 h-5 w-64" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => {
              return (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-10 rounded-md" />
                  <Skeleton className="h-5 flex-1 rounded-md" />
                  <Skeleton className="h-5 w-10 rounded-md" />
                </div>
              )
            })}
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <Skeleton className="h-3 w-44" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
        <div className="border-border bg-card col-span-1 flex flex-col gap-6 rounded-lg border p-4 shadow-xs md:col-span-2">
          <Skeleton className="mb-6 h-5 w-64" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => {
              return (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-10 rounded-md" />
                  <Skeleton className="h-5 flex-1 rounded-md" />
                  <Skeleton className="h-5 w-10 rounded-md" />
                </div>
              )
            })}
          </div>
        </div>
        <div className="border-border bg-card col-span-1 flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-10 shadow-xs md:col-span-2 lg:col-span-4">
          <Skeleton className="size-13 rounded-lg" />
          <Skeleton className="h-4 w-60 rounded-md" />
          <Skeleton className="h-4 w-64 rounded-md" />
          <Skeleton className="h-8 w-44 rounded-md" />
          <Skeleton className="mt-2 h-3 w-36 rounded-md" />
        </div>
        <div className="border-border bg-card col-span-1 flex flex-col gap-6 rounded-lg border p-4 shadow-xs md:col-span-2 lg:col-span-4">
          <Skeleton className="mb-6 h-5 w-64" />
          <div className="border-border divide-border w-full flex-col divide-y overflow-hidden rounded-lg border">
            <div className="bg-card h-10 w-full" />
            <div className="bg-card divide-border grid grid-cols-6 divide-x divide-y">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-2">
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
