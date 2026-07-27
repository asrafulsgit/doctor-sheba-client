import { Skeleton } from "@/components/ui/skeleton";

const ReivewsSkeleton = () => {
  return (
    <div>
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-56" />
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-14" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Distribution + reviews */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Rating distribution */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <Skeleton className="h-5 w-40" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3 flex-1 rounded-full" />
                <Skeleton className="h-3 w-6" />
              </div>
            ))}
          </div>
        </section>

        {/* All reviews */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <Skeleton className="h-5 w-28" />
          <ul className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <li
                key={i}
                className="rounded-lg border border-border bg-surface p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-x-2">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <div className="flex flex-col justify-center gap-2">
                      <Skeleton className="h-3.5 w-28" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="mt-3 space-y-1.5">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ReivewsSkeleton;
