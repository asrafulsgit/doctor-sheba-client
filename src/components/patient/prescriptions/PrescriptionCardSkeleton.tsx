import { Skeleton } from "@/components/ui/skeleton";

const PrescriptionCardSkeleton = () => {
  return Array.from({ length: 6 }).map((_, index) => (
    <article
      key={index}
      className="rounded-2xl border border-border bg-card p-6 shadow-soft"
    >
      {/* Header */}
      <header className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-40" />
        </div>

        <Skeleton className="h-9 w-20 rounded-md" />
      </header>

      {/* Medications */}
      <div className="mt-4 rounded-lg border border-border divide-y divide-border">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start justify-between gap-3 p-3"
          >
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-44" />
            </div>

            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Follow-up */}
      <Skeleton className="mt-3 h-4 w-40" />
    </article>
  ));
};

export default PrescriptionCardSkeleton;
