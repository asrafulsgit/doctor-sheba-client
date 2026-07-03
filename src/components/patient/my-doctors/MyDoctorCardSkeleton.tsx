import { Skeleton } from "@/components/ui/skeleton";

export function MyDoctorCardSkeleton() {
  return Array.from({ length: 6 }).map((_, index) => (
    <div key={index} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>

      {/* Doctor Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-44" />
        </div>

        {/* Uncomment if you later add visits */}
        {/* <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div> */}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-9 flex-1 rounded-md" />
        <Skeleton className="h-9 flex-1 rounded-md" />
      </div>
    </div>
  ));
}
