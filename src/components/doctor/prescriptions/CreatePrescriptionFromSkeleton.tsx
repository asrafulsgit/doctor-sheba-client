import { Skeleton } from "@/components/ui/skeleton";

const CreatePrescriptionFromSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* ── Patient info card skeleton ─────────────────────────── */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
        <div className="min-w-0 w-full space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-56" />
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-3 w-44" />
        </div>
      </div>

      {/* ── Form skeleton ──────────────────────────────────────── */}
      <div className="space-y-6">
        {/* Diagnosis */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-9 w-full" />
        </div>

        {/* Medications */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>

          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-2 rounded-md border border-border p-2"
              >
                <Skeleton className="col-span-4 h-9" />
                <Skeleton className="col-span-2 h-9" />
                <Skeleton className="col-span-3 h-9" />
                <Skeleton className="col-span-2 h-9" />
                <Skeleton className="col-span-1 h-9" />
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-16 w-full" />
        </div>

        {/* Follow-up date */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-9 w-full" />
        </div>
      </div>

      {/* ── Actions skeleton ───────────────────────────────────── */}
      <div className="flex justify-end gap-2 pt-2">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
  );
};

export default CreatePrescriptionFromSkeleton;
