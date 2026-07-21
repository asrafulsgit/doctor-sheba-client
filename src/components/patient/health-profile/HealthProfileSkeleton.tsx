import { Skeleton } from "@/components/ui/skeleton";

// Small helper so a "field" skeleton always looks the same:
// a label-height bar + an input-height bar underneath.
const FieldSkeleton = () => (
  <div className="space-y-1.5">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-9 w-full" />
  </div>
);

const ToggleRowSkeleton = () => (
  <div className="flex items-center justify-between rounded-lg bg-surface px-3 py-2.5">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-5 w-9 rounded-full" />
  </div>
);

const HealthProfileSkeleton = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-2" aria-busy="true" aria-label="Loading health profile">
      {/* Personal health -------------------------------------------------- */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-5 w-36" />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton />
          <FieldSkeleton />
        </div>
      </section>

      {/* Medical history ---------------------------------------------------*/}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="mt-5 space-y-4">
          <ToggleRowSkeleton />
          <ToggleRowSkeleton />
          <ToggleRowSkeleton />
          <ToggleRowSkeleton />
          <ToggleRowSkeleton />
          <ToggleRowSkeleton />
          <ToggleRowSkeleton />
        </div>
      </section>

      {/* Additional notes ---------------------------------------------------*/}
      <section className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-5 w-40" />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </section>

      <div className="lg:col-span-2 flex justify-end">
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
    </div>
  );
};

export default HealthProfileSkeleton;