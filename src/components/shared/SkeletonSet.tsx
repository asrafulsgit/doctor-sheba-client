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

export const SpecialtyCardSkeleton = ({ rows = 4 }: { rows?: number }) => {
  return Array.from({ length: rows }, (_, index) => (
    <div
      key={index}
      className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-soft"
    >
      {/* Icon */}
      <Skeleton className="h-12 w-12 rounded-xl" />

      {/* Title */}
      <Skeleton className="h-4 w-24" />
    </div>
  ));
};

export function HealthTipCardSkeleton({ rows = 4 }: { rows?: number }) {
  return Array.from({ length: rows }, (_, index) => (
    <article
      key={index}
      className="flex h-full flex-col rounded-xl border border-border bg-surface p-6"
    >
      {/* Icon */}
      <Skeleton className="size-11 rounded-xl" />

      {/* Category */}
      <Skeleton className="mt-6 h-4 w-24" />

      {/* Title */}
      <div className="mt-3 space-y-2">
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-3/4" />
      </div>

      {/* Excerpt */}
      <div className="mt-4 flex-1 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="size-4 rounded-full" />
        </div>
      </div>
    </article>
  ));
}

export function HealthTipDetailSkeleton() {
  return (
    <main className="animate-pulse">
      {/* HEADER */}
      <header className="border-b border-border bg-surface-muted">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          {/* Back button */}
          <div className="h-8 w-40 rounded-md bg-muted" />

          {/* Category */}
          <div className="mt-8 h-4 w-28 rounded bg-muted" />

          {/* Title */}
          <div className="mt-3 space-y-3">
            <div className="h-10 w-full rounded bg-muted sm:h-12" />
            <div className="h-10 w-3/4 rounded bg-muted sm:h-12" />
          </div>

          {/* Excerpt */}
          <div className="mt-5 space-y-2">
            <div className="h-5 w-full rounded bg-muted" />
            <div className="h-5 w-5/6 rounded bg-muted" />
          </div>

          {/* Views */}
          <div className="mt-5 h-4 w-24 rounded bg-muted" />
        </div>
      </header>

      {/* ARTICLE */}
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Warning box */}
        <div className="mb-10 flex gap-3 rounded-xl border border-border bg-muted p-5">
          <div className="mt-0.5 h-5 w-5 rounded bg-muted-foreground/20" />
          <div className="w-full space-y-2">
            <div className="h-4 w-1/4 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
          </div>
        </div>

        {/* Content section */}
        <section className="mb-10 space-y-4">
          <div className="h-5 w-full rounded bg-muted" />
          <div className="h-5 w-full rounded bg-muted" />
          <div className="h-5 w-11/12 rounded bg-muted" />
          <div className="h-5 w-10/12 rounded bg-muted" />
          <div className="h-5 w-9/12 rounded bg-muted" />
        </section>
      </article>
    </main>
  );
}

 
export function DashboardTopNavbarSkeleton() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <Skeleton className="size-10 rounded-md lg:hidden" />

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="hidden h-5 w-24 sm:block" />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* User info */}
          <div className="hidden flex-col items-end gap-1 sm:flex">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-20" />
          </div>

          {/* Avatar */}
          <Skeleton className="size-9 rounded-full" />

          {/* Logout */}
          <Skeleton className="size-9 rounded-md" />
        </div>
      </div>
    </header>
  );
}
 
export function DashboardSidebarSkeleton() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-border bg-background lg:block">
      <nav className="flex h-full flex-col gap-0.5 overflow-y-auto pt-5 lg:p-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
              index === 0 ? "bg-accent/50" : ""
            }`}
          >
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton
              className={`h-4 ${
                index === 0 ? "w-28" : index % 2 === 0 ? "w-24" : "w-32"
              }`}
            />
            {index === 0 && <Skeleton className="ml-auto h-3.5 w-3.5 rounded-sm" />}
          </div>
        ))}
      </nav>
    </aside>
  );
}