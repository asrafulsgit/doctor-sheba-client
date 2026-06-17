import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  trend?: number; // percent change
  tone?:
    | "primary"
    | "success"
    | "warning"
    | "info"
    | "destructive"
    | "secondary";
}

const TONES: Record<NonNullable<StatCardProps["tone"]>, string> = {
  primary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning-foreground",
  info: "bg-info-soft text-info",
  destructive: "bg-destructive-soft text-destructive",
  secondary: "bg-secondary-soft text-secondary",
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  hint,
  trend,
  tone = "primary",
}: StatCardProps) => {
  const up = (trend ?? 0) >= 0;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "grid h-10 w-10 place-items-center rounded-lg",
            TONES[tone],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        {typeof trend === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              up
                ? "bg-success-soft text-success"
                : "bg-destructive-soft text-destructive",
            )}
          >
            {up ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {up ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground/80">{hint}</p>}
    </div>
  );
};

export default StatCard;
