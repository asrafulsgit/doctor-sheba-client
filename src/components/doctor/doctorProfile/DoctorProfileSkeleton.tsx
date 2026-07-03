import { Skeleton } from "@/components/ui/skeleton";

export function DoctorProfileSkeleton() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary-soft/60 to-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Skeleton className="h-24 w-24 rounded-2xl" />

            <div className="flex-1">
              {/* Specialities */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>

              {/* Name */}
              <Skeleton className="mt-3 h-10 w-72" />

              {/* Designation */}
              <Skeleton className="mt-2 h-5 w-56" />

              {/* Stats */}
              <div className="mt-5 flex flex-wrap gap-6">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-44" />
              </div>
            </div>

            <Skeleton className="h-11 w-48 rounded-md" />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-10 lg:px-8">
        {/* Left */}
        <div className="space-y-8 lg:col-span-2">
          {/* About */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <Skeleton className="h-6 w-24" />

            <div className="mt-4 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>

          {/* Credentials */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <Skeleton className="h-6 w-36" />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg bg-surface p-4"
                >
                  <Skeleton className="h-5 w-5 rounded-full" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="mt-6 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-surface p-4"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>

                  <div className="mt-3 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="mt-8 lg:mt-0">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <Skeleton className="h-9 w-36" />

            <Skeleton className="mt-5 h-11 w-full rounded-md" />

            <div className="mt-6 space-y-4 border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}