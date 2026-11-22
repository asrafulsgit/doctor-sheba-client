import { Calendar, Clock, Stethoscope, Video } from "lucide-react";
import { format } from "date-fns";
import { StatusBadge } from "@/components/ui/badge";
import type { UpcomingAppointment } from "@/types/patient";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AppointmentItemProps {
  appointment: UpcomingAppointment;
}

const AppointmentItem = ({ appointment }: AppointmentItemProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start 
      sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl">
            {appointment.doctor.profilePhoto ? (
              <Image
                src={appointment.doctor.profilePhoto ?? ""}
                alt="Profile"
                className="h-full w-full rounded-xl object-cover border border-primary-soft"
                width={48}
                height={48}
              />
            ) : (
              <Stethoscope
                className="size-7 bg-primary-soft 
          text-primary"
              />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">
              {appointment.doctor.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {appointment.doctor.designation}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
          <StatusBadge status={appointment.status} />
        </div>
      </div>

      <div className="flex justify-between  gap-3 border-t border-border px-4 py-2 
      flex-col sm:flex-row">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-1">
          <Calendar className="size-4 text-primary" />
          <p className="truncate text-xs font-medium text-foreground">
            {format(
              new Date(appointment.schedule.startDateTime),
              "dd MMM yyyy",
            )}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Clock className="size-4 text-primary" />
          <p className="text-xs font-medium text-foreground">
            {format(new Date(appointment.schedule.startDateTime), "hh:mm a")} –{" "}
            {format(new Date(appointment.schedule.endDateTime), "hh:mm a")}
          </p>
        </div>
        </div>
        
        {appointment.videoCallingId && appointment.videoCallingLink && (
          <Link href={appointment.videoCallingLink} target="_blank">
            <Button className="w-full sm:w-auto" size="sm">
              <Video className="mr-2 size-4" />
              Join consultation
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default AppointmentItem;
