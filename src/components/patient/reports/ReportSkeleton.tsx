import { Skeleton } from "@/components/ui/skeleton";

const ReportSkeleton = () => {
  return Array.from({ length: 6 }).map((_, index) => (
    <div key={index} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      {/* Icon */}
      <Skeleton className="h-11 w-11 rounded-lg" />

      {/* Report Name */}
      <Skeleton className="mt-3 h-4 w-3/4" />

      {/* Date */}
      <Skeleton className="mt-2 h-3 w-24" />

      {/* Actions */}
      <div className="mt-3 flex gap-2">
        <Skeleton className="h-9 flex-1 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  ));
};

export default ReportSkeleton;
