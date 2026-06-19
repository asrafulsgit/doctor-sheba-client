import type { LucideIcon } from "lucide-react";
import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: LucideIcon;
  className?: string;
};

function PageState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: StateProps) {
  const Icon = icon || Inbox;
  return (
    <section
      className={cn(
        "flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted px-6 py-12 text-center",
        className,
      )}
      aria-labelledby="page-state-title"
    >
      { icon &&
        <span className="mb-4 grid size-11 place-items-center rounded-full bg-info text-info-foreground">
          <Icon aria-hidden="true" className="size-5" />
        </span>
      }
      <h2
        id="page-state-title"
        className="text-lg font-semibold text-foreground"
      >
        {title}
      </h2>
      {description && <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>}
      {actionLabel && onAction ? (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </section>
  );
}

export function EmptyState(props: StateProps) {
  return <PageState {...props} />;
}

export function ErrorState(props: StateProps) {
  return <PageState {...props} icon={props.icon ?? AlertCircle} />;
}

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div
      className="flex min-h-32 items-center justify-center gap-3 text-sm text-muted-foreground"
      role="status"
    >
      <LoaderCircle
        className="size-5 animate-spin text-primary"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}
