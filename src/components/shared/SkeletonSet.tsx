import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function SkeletonSet({
  rows = 4,
  variant = "list",
}: {
  rows?: number;
  variant?: "list" | "cards" | "table";
}) {
  if (variant === "cards") {
    return (
      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Loading content"
      >
        {Array.from({ length: rows }, (_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-5"
          >
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-4/5" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div
      className="overflow-hidden rounded-xl border border-border bg-card"
      aria-label="Loading content"
    >
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border-b border-border p-4 last:border-0"
        >
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="mt-2 h-3 w-2/3" />
          </div>
          {variant === "table" ? <Skeleton className="h-8 w-20" /> : null}
        </div>
      ))}
    </div>
  );
}

export const DoctorCardSkeleton = ({ rows = 4 }: { rows?: number }) => {
  return Array.from({ length: rows }, (_, index) => (
    <Card
      key={index}
      className="group h-full overflow-hidden border-border shadow-xs py-0"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <CardContent className="px-4 pb-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-3 h-6 w-40" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>

          <Skeleton className="h-8 w-14 rounded-md" />
        </div>

        {/* Experience & Fee */}
        <div className="mt-5 grid grid-cols-2 gap-3 border-y border-border py-4">
          <Skeleton className="h-4 w-24" />
          <div className="flex justify-end">
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  ));
};
