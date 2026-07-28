"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RowSkeleton from "@/components/shared/SkeletonSet";

const EarningsSkeleton = () => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" /> {/* title */}
          <Skeleton className="h-4 w-64" /> {/* description */}
        </div>
        <Skeleton className="h-10 w-32 rounded-md" /> {/* Statement button */}
      </div>

      {/* ── Date filters ───────────────────────────────────────── */}
      <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div className="space-y-2">
          <Skeleton className="h-4 w-10" /> {/* Label "From" */}
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-8" /> {/* Label "To" */}
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>

      {/* ── Stat cards (EarningStats) ──────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="overflow-hidden rounded-2xl border-border shadow-soft"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-1 h-7 w-28" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Chart section ──────────────────────────────────────── */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="mt-6">
          {/* Chart area skeleton – mimics AreaChartLinear height */}
          <Skeleton className="h-[280px] w-full rounded-xl" />
        </div>
      </section>

      {/* ── Table skeleton ─────────────────────────────────────── */}
      <div className="">
        {Array.from({ length: 6 }).map((_, i) => (
          <RowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default EarningsSkeleton;
