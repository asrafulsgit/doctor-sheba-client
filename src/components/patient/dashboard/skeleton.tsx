import { DashBoardHeaderSkeleton, StatsSkeleton } from "@/components/shared/SkeletonSet";

export default function PatientDashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8 max-w-7xl">
      {/* Header */}
      <DashBoardHeaderSkeleton />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsSkeleton />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Next Appointment */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="h-5 w-40 rounded bg-muted" />
            <div className="h-4 w-20 rounded bg-muted" />
          </div>

          {/* Hero Appointment */}
          <div className="mt-5 rounded-xl border border-border p-5">
            <div className="flex justify-between gap-6">
              <div className="flex gap-4">
                <div className="h-14 w-14 rounded-xl bg-muted" />

                <div className="space-y-3">
                  <div className="h-5 w-44 rounded bg-muted" />
                  <div className="h-4 w-36 rounded bg-muted" />

                  <div className="flex gap-3 pt-2">
                    <div className="h-4 w-28 rounded bg-muted" />
                    <div className="h-4 w-24 rounded bg-muted" />
                    <div className="h-4 w-28 rounded bg-muted" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-7 w-20 rounded-full bg-muted" />
                <div className="h-9 w-28 rounded-lg bg-muted" />
              </div>
            </div>
          </div>

          {/* Upcoming List */}
          <div className="mt-4 divide-y divide-border rounded-xl border border-border">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted" />

                  <div>
                    <div className="h-4 w-36 rounded bg-muted" />
                    <div className="mt-2 h-3 w-52 rounded bg-muted" />
                  </div>
                </div>

                <div className="h-6 w-20 rounded-full bg-muted" />
              </div>
            ))}
          </div>
        </section>

        {/* Health Summary */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="h-5 w-36 rounded bg-muted" />
            <div className="h-6 w-20 rounded-full bg-muted" />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border p-3">
                <div className="h-3 w-16 rounded bg-muted" />
                <div className="mt-2 h-5 w-20 rounded bg-muted" />
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-border p-3">
            <div className="h-4 w-20 rounded bg-muted" />
            <div className="mt-2 space-y-2">
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-4/5 rounded bg-muted" />
            </div>
          </div>

          <div className="mt-4 h-10 w-full rounded-lg bg-muted" />
        </section>
      </div>

      {/* Recent Prescriptions */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="h-5 w-44 rounded bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-4">
              <div className="h-4 w-28 rounded bg-muted" />

              <div className="mt-4 h-5 w-full rounded bg-muted" />
              <div className="mt-2 h-4 w-3/4 rounded bg-muted" />

              <div className="mt-5 space-y-2">
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-5/6 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
