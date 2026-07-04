import { Skeleton } from "@/components/ui/skeleton";

const BookingSkeleton = () => {
  return (
    <>
      {/* Header */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Skeleton className="h-5 w-32" />

          <Skeleton className="mt-4 h-10 w-72" />

          <Skeleton className="mt-3 h-5 w-60" />

          {/* Steps */}
          <div className="mt-8 flex items-center gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        {/* Left */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />

          {/* Date cards */}
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border p-3"
              >
                <Skeleton className="mx-auto h-3 w-10" />
                <Skeleton className="mx-auto mt-3 h-7 w-8" />
                <Skeleton className="mx-auto mt-2 h-3 w-8" />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </div>

        {/* Right Sidebar */}
        <aside>
          <div className="rounded-2xl border border-border bg-card p-5">
            <Skeleton className="h-4 w-28" />

            <div className="mt-5 flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t pt-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};

export default BookingSkeleton;