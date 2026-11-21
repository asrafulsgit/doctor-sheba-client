import { Button } from "@/components/ui/button";
import React from "react";
import { SelectedSlot } from "./Booking";
import { useBooking } from "@/lib/hooks/useAppointment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";

type BookingStep3Props = {
  selectedDate: Date;
  doctorId: string;
  doctorName: string | null;
  doctorAppointmentFee: number | null;
  slot: SelectedSlot;
  back: () => void;
};
const BookingStep3 = ({
  selectedDate,
  doctorName,
  doctorId,
  doctorAppointmentFee,
  slot,
  back,
}: BookingStep3Props) => {
  const router = useRouter();
  const { mutate: booking, isPending } = useBooking();

  const confirm = async () => {
    if (!slot) return;
    const payload = {
      doctorId,
      scheduleId: slot.id,
    };

    booking(payload, {
      onSuccess: (data) => {
        router.push(data?.data?.session_url as string);
      },
      onError: (error: any) => {
        toast.error(error.message || "Error while booking!");
      },
    });
  };
  return (
    <div>
      <h2 className="text-lg font-semibold">Review & confirm</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Please review your appointment details.
      </p>
      <dl className="mt-5 grid gap-3 rounded-xl bg-surface p-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Doctor</dt>
          <dd className="font-medium text-foreground">{doctorName}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Date</dt>
          <dd className="font-medium text-foreground">
            {slot?.startTime &&
              format(new Date(slot.startTime), "EEEE, d MMMM")}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Time</dt>
          <dd className="font-medium text-foreground">
            {format(new Date(slot.startTime), "h:mm a")} –{" "}
            {format(new Date(slot.endTime), "h:mm a")}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Fee</dt>
          <dd className="font-medium text-foreground">
            ৳{doctorAppointmentFee?.toLocaleString()}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" onClick={back}>
          Back
        </Button>
        <Button onClick={confirm} disabled={isPending}>
          {isPending
            ? "Confirming…"
            : `Confirm — ৳${doctorAppointmentFee?.toLocaleString()}`}
        </Button>
      </div>
    </div>
  );
};

export default BookingStep3;
