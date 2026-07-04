import { Skeleton } from "@/components/ui/skeleton";

const PaymentSuccessSkeleton = () => {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 animate-pulse">
      {/* Header */}
      <div className="text-center">
        <Skeleton className="mx-auto h-16 w-16 rounded-full" />
        <Skeleton className="mx-auto mt-5 h-8 w-72" />
        <Skeleton className="mx-auto mt-3 h-4 w-96 max-w-full" />
      </div>

      {/* Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Appointment Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <Skeleton className="h-4 w-36" />

          <div className="mt-6 space-y-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-36" />
              </div>
            ))}
          </div>
        </div>

        {/* Payment Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <Skeleton className="h-4 w-28" />

          <div className="mt-6 space-y-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Skeleton className="h-10 w-40 rounded-md" />
        <Skeleton className="h-10 w-40 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>
    </section>
  );
};

export default PaymentSuccessSkeleton;