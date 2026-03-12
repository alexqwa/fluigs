import { Skeleton } from '@/components/ui/skeleton'

export function AnalyticsSkeletonCard() {
  return (
    <div className="border-border bg-card rounded-lg border p-4 shadow-xs">
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
  )
}
