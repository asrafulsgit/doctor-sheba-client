import { Calendar, Clock, Stethoscope, Video } from "lucide-react";
import { format } from "date-fns";

import { StatusBadge } from "@/components/ui/badge";
import type { UpcomingAppointment } from "@/types/patient";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AppointmentItemProps {
  appointment: UpcomingAppointment;
}

const AppointmentItem = ({ appointment }: AppointmentItemProps) => {
  
  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Stethoscope className="size-7" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-foreground">
              {appointment.doctor.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {appointment.doctor.designation}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
          <StatusBadge status={appointment.status} />   
        </div>
      </div>

      {/* Appointment Details */}
      <div className="mx-5 mb-5 grid gap-3 rounded-xl bg-muted/50 p-4 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-background text-primary">
            <Calendar className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="truncate text-sm font-medium text-foreground">
              {format(
                new Date(appointment.schedule.startDateTime),
                "dd MMM yyyy",
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-background text-primary">
            <Clock className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="text-sm font-medium text-foreground">
              {format(new Date(appointment.schedule.startDateTime), "hh:mm a")}{" "}
              – {format(new Date(appointment.schedule.endDateTime), "hh:mm a")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-background text-primary">
            {appointment.videoCallingId && appointment.videoCallingLink && (
              <Link href={appointment.videoCallingLink} target="_blank">
                <Video className="size-4" />
              </Link>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Appointment type</p>
            <p className="text-sm font-medium text-foreground">
              Video consultation
            </p>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-end">
        <Button asChild className="w-full sm:w-auto" size="sm">
          <Link href="/patient/appointments">
            {/* {next.mode === "VIDEO" ? (
              <> */}
            <Video className="mr-2 size-4" />
            Join consultation
            {/* </> */}
            {/* ) : (
              <>
                View appointment
                <ArrowRight className="ml-2 size-4" />
              </>
            )} */}
          </Link>
        </Button>
      </div>
    </>
  );
};

export default AppointmentItem;

{
  /* <div className="flex items-center justify-between gap-3 p-4">
  <div className="flex min-w-0 items-center gap-3">
    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
      <Stethoscope className="h-4 w-4" />
    </div>

    <div className="min-w-0">
      <p className="truncate text-sm font-medium text-foreground">
        {appointment.doctor.name}
      </p>

      <p className="text-xs text-muted-foreground">
        {appointment.doctor.designation} ·{" "}
        {format(
          new Date(appointment.schedule.startDateTime),
          "dd MMM yyyy · hh:mm a",
        )}
      </p>
    </div>
  </div>

  <StatusBadge status={appointment.status} />
</div>; */
}
