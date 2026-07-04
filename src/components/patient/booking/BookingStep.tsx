import { cn } from "@/lib/utils";
import { Check } from "lucide-react"; 
export type Step = 1 | 2 | 3 | 4;
const BookingStep = ({ step }: { step: Step }) => {
  const steps = [
    { n: 1, label: "Date" },
    { n: 2, label: "Time" },
    { n: 3, label: "Review" },
    { n: 4, label: "Done" },
  ];
  return (
    <ol className="mt-8 flex items-center gap-2">
      {steps.map((s, i) => {
        const active = step === s.n;
        const done = step > s.n;
        return (
          <li key={s.n} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "grid h-7 w-7 place-items-center rounded-full text-xs font-semibold transition-colors",
                done || active
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : s.n}
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                active || done ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "ml-2 hidden h-px flex-1 sm:block",
                  done ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default BookingStep;
