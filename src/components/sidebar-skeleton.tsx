import { Skeleton } from './ui/skeleton'

export function SidebarSkeleton() {
  return (
    <div className="border-border bg-card relative flex min-h-svh w-3xs flex-col border-r">
      <div className="mt-2 flex w-fit items-center gap-4 p-2">
        <Skeleton className="bg-muted size-10 shrink-0 rounded-lg" />
        <div className="grid gap-2">
          <Skeleton className="bg-muted h-4 w-[150px]" />
          <Skeleton className="bg-muted h-4 w-[100px]" />
        </div>
      </div>
      <div className="mt-6 px-2">
        <Skeleton className="bg-muted h-4 w-[80px]" />
        <div className="mt-2 flex flex-col gap-2">
          <Skeleton className="bg-muted h-8 w-full" />
          <Skeleton className="bg-muted h-8 w-full" />
          <Skeleton className="bg-muted h-8 w-full" />
        </div>
      </div>
      <div className="absolute bottom-2 left-0 flex w-full items-center gap-4 p-2">
        <Skeleton className="bg-muted size-10 shrink-0 rounded-lg" />
        <div className="flex flex-col gap-2">
          <Skeleton className="bg-muted h-4 w-[170px]" />
          <Skeleton className="bg-muted h-4 w-[130px]" />
        </div>
      </div>
    </div>
  )
}
