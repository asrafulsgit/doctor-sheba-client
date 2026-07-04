import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
type BookingStep1Props = {
  selectedDate: Date;
  setSelectedDate:(date : Date)=>void
  setSlot: () => void;
  next: () => void;
};
const BookingStep1 = ({selectedDate,setSelectedDate,setSlot,next}:BookingStep1Props) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Choose a date</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick a day in the next 14 days.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {Array.from({ length: 14 }).map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() + i);

          const selected = d.toDateString() === selectedDate.toDateString();

          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                setSelectedDate(d);
                setSlot();
              }}
              className={cn(
                "flex flex-col items-center rounded-lg border px-3 py-3 text-sm transition-colors",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/40",
              )}
            >
              <span className="text-xs opacity-80">
                {d.toLocaleDateString(undefined, {
                  weekday: "short",
                })}
              </span>

              <span className="mt-1 text-lg font-semibold">{d.getDate()}</span>

              <span className="text-xs opacity-80">
                {d.toLocaleDateString(undefined, {
                  month: "short",
                })}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={next}>Continue</Button>
      </div>
    </div>
  );
};

export default BookingStep1;
