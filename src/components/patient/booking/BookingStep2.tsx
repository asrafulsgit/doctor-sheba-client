import { Button } from "@/components/ui/button";
import { IDoctorSchedule } from "@/types/doctors";
import { SelectedSlot } from "./Booking";
import { cn } from "@/lib/utils";

type SelectedSchedules = {
    id: string;
    scheduleId: string;
    startTime: string;
    endTime: string;
    isBooked: boolean;
}

type BookingStep2Props = {
  selectedDate: Date;
  availableSchedules: SelectedSchedules[];
  setSlot: (data: SelectedSlot) => void;
  slot: SelectedSlot | null;
  back: () => void;
  next: () => void;
};

const BookingStep2 = ({
  selectedDate,
  availableSchedules,
  setSlot,
  slot,
  back,
  next,
}: BookingStep2Props) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Pick a time slot</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Available slots for{" "}
        {new Date(selectedDate).toLocaleDateString(undefined, {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
        .
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {availableSchedules.length ? (
          availableSchedules.map((s) => {
            const start = new Date(s.startTime);
            const selected = slot?.id === s.id;
            return (
              <button
                key={s.id}
                type="button"
                disabled={s.isBooked}
                onClick={() =>
                  setSlot({
                    id: s.scheduleId,
                    startTime: s.startTime,
                    endTime: s.endTime,
                    date: selectedDate.toString(),
                  })
                }
                className={cn(
                  "rounded-lg border px-3 py-3 text-sm font-medium transition-all",
                  s.isBooked
                    ? "border-border bg-muted text-muted-foreground line-through opacity-60"
                    : selected
                      ? "border-primary bg-primary text-primary-foreground scale-[1.02]"
                      : "border-border bg-background text-foreground hover:border-primary/40",
                )}
              >
                {start.toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </button>
            );
          })
        ) : (
          <p>No Slot available</p>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" onClick={back}>
          Back
        </Button>
        <Button onClick={next} disabled={!slot}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BookingStep2;
