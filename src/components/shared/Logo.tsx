import { cn } from "@/lib/utils";
import { HeartPulse } from "lucide-react";

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
        <HeartPulse className="size-5" aria-hidden="true" />
      </span>
      {compact ? (
        <span className="sr-only">DoctorSheba</span>
      ) : (
        <span className="text-[18px]">
          Doctor<span className="text-primary">Sheba</span>
        </span>
      )}
    </span>
  );
}