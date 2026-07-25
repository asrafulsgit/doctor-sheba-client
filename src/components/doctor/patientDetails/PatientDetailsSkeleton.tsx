import { Skeleton } from "@/components/ui/skeleton";

const PatientDetailsSkeleton = () => {
  return (
    <>
      {/* Profile header */}
      <section className="flex flex-wrap items-start gap-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <Skeleton className="h-20 w-19 rounded-full" />
        <div className="flex-1 min-w-[260px]">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-36" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health snapshot + last consultation */}
      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border px-3 py-2"
              >
                <Skeleton className="h-3 w-16" />
                <Skeleton className="mt-1.5 h-4 w-20" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-5 w-36" />
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="mt-6">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-36 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>

        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-64" />
                </div>
              </div>
              <div className="mt-3 overflow-hidden rounded-lg border border-border">
                <div className="bg-surface px-3 py-2">
                  <Skeleton className="h-3 w-full" />
                </div>
                <div className="divide-y divide-border">
                  {Array.from({ length: 2 }).map((_, j) => (
                    <div key={j} className="flex gap-4 px-3 py-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default PatientDetailsSkeleton;
