import { Skeleton } from "@/components/ui/skeleton";

const SchedulesSkeleton = () => {
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <article
          key={i}
          className="rounded-2xl border border-border bg-card p-5 shadow-soft"
        >
          <header className="mb-3 flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </header>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <Skeleton key={j} className="h-8 w-full rounded-lg" />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
};

export default SchedulesSkeleton;
