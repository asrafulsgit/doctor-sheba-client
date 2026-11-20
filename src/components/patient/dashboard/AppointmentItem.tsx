
import { Stethoscope } from "lucide-react";
import { format } from "date-fns";

import { StatusBadge } from "@/components/ui/badge";
import type { UpcomingAppointment } from "@/types/patient";

interface AppointmentItemProps {
  appointment: UpcomingAppointment;
}

const AppointmentItem = ({ appointment }: AppointmentItemProps) => {
  return (
    <div className="flex items-center justify-between gap-3 p-4">
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
    </div>
  );
};

export default AppointmentItem;
