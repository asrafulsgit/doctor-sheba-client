import { Skeleton } from "@/components/ui/skeleton";

const FieldSkeleton = () => (
  <div className="space-y-1.5">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-9 w-full" />
  </div>
);

const ProfileFormSkeleton = () => {
  return (
    <div
      className="rounded-2xl border border-border bg-card p-6 shadow-soft"
      aria-busy="true"
      aria-label="Loading profile"
    >
      <Skeleton className="h-5 w-24" />

      <div className="mt-5 mb-2 rounded-xl border border-border/60 bg-surface p-4">
        <Skeleton className="h-20 w-20 rounded-full" />
      </div>

      <div className="mt-5 grid gap-4">
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>
    </div>
  );
};

export default ProfileFormSkeleton;