import { Button } from "@/components/ui/button";
import { IDoctorSchedule } from "@/types/doctors";
import { SelectedSlot } from "./Booking";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarX2 } from "lucide-react";

type SelectedSchedules = {
  id: string;
  scheduleId: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

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
        Available slots for {format(new Date(selectedDate), "EEEE, d MMMM")}.
      </p>
      <div className="mt-5">
        {availableSchedules.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {availableSchedules.map((s) => {
              const start = new Date(s.startTime);
              const selected = slot?.id === s.scheduleId;

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
                      ? "border-border bg-muted text-muted-foreground line-through opacity-60 cursor-not-allowed"
                      : selected
                        ? "border-primary bg-primary text-primary-foreground scale-[1.02]"
                        : "border-border bg-background text-foreground hover:border-primary/40",
                  )}
                >
                  {format(start, "h:mm a")}
                </button>
              );
            })}
          </div>
        ) : (
          <EmptySlot />
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

const EmptySlot = () => {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-xl 
    border border-dashed bg-muted/30 text-center p-1"
    >
      <div className="mb-1 flex size-12 items-center justify-center rounded-full bg-muted">
        <CalendarX2 className="size-6 text-muted-foreground" />
      </div>

      <h3 className="text-sm font-semibold text-foreground">
        No available slots
      </h3>

      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        There are no appointment slots available for this date. Please select
        another date to see available times.
      </p>
    </div>
  );
};

export default BookingStep2;
