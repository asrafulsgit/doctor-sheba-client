
import { Skeleton } from "@/components/ui/skeleton";

const UpdateHealthTipSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          {/* Form header */}
          <div className="border-b border-border bg-surface/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-3 w-52 max-w-full" />
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-5 p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Title */}
              <div className="space-y-2 sm:col-span-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              {/* Content */}
              <div className="space-y-2 sm:col-span-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-48 w-full rounded-md" />
              </div>

              {/* Publish switch */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-64 max-w-full" />
                  </div>

                  <Skeleton className="h-6 w-11 shrink-0 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Form actions */}
          <div className="flex items-center justify-between border-t border-border bg-surface/30 px-6 py-4">
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-32 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHealthTipSkeleton;
