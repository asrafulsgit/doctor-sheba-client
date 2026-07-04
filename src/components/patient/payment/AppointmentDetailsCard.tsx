import { IAppointment } from "@/types/appointment";
import React from "react";
import { Row } from "./Success";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { StatusBadge } from "@/components/ui/badge";

const AppointmentDetailsCard = ({
  appointment,
}: {
  appointment: IAppointment;
}) => {
  return (
    <dl className="mt-4 space-y-3 text-sm">
      <Row
        label="Appointment ID"
        value={<span className="font-mono">{appointment.id}</span>}
      />
      <Row label="Doctor" value={appointment.doctor.name} />
      <Row label="Specialty" value={appointment.doctor.designation} />
      <Row
        label="Date"
        value={
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            {format(
              new Date(appointment.schedule.startDateTime),
              "EEEE, MMMM d, yyyy",
            )}
          </span>
        }
      />
      <Row
        label="Time"
        value={
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            {format(new Date(appointment.schedule.startDateTime), "hh:mm a")}–{" "}
            {format(new Date(appointment.schedule.endDateTime), "hh:mm a")}
          </span>
        }
      />
      <Row label="Status" value={<StatusBadge status={appointment.status} />} />
    </dl>
  );
};

export default AppointmentDetailsCard;
