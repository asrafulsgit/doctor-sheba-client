import { cn } from "@/lib/utils";


type Rows = {
  "1star": number;
    "2star": number;
    "3star": number;
    "4star": number;
    "5star": number;
}


const HorizantalBar = ({
  rows,
  format = (n: number) => String(n),
  className,
}: {
  rows: Rows;
  format?: (n: number) => string;
  className?: string;
}) => {
  const ratingArray = Object.entries(rows).map(([label, value]) => ({
  label,
  value
}));
  const max = Math.max(...ratingArray.map((r) => r.value), 1);
  return (
    <div className={cn("space-y-3", className)}>
      {ratingArray.map((r) => (
        <div key={r.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">{r.label}</span>
            <span className="text-muted-foreground">
              {format(r.value)}
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
