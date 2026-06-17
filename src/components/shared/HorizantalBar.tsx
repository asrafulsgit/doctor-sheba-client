import { cn } from "@/lib/utils";

const HorizantalBar = ({
  rows,
  format = (n: number) => String(n),
  className,
}: {
  rows: Array<{ label: string; value: number; sub?: string }>;
  format?: (n: number) => string;
  className?: string;
}) => {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div className={cn("space-y-3", className)}>
      {rows.map((r) => (
        <div key={r.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">{r.label}</span>
            <span className="text-muted-foreground">
              {r.sub ?? format(r.value)}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(r.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizantalBar;
