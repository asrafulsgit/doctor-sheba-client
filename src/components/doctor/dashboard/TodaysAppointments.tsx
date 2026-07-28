import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDate } from "@/helpers/getDate";
import { IAppointment } from "@/types/appointment"; 
import { format } from "date-fns";
import { ClipboardList, Clock, Video } from "lucide-react";

const TodaysAppointments = ({appointments} :{appointments : IAppointment[]}) => {
  return appointments?.length ? (
    <ol className="mt-4 space-y-3">
      {appointments?.map((a) => (
        <li
          key={a.id}
          className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4"
        >
          <div className="grid h-12 w-14 shrink-0 place-items-center 
          rounded-lg bg-primary-soft text-primary">
            <div className="font-medium">
              {getDate(a.schedule.startDateTime,"hh")}
            </div>
            <div className="-mt-2">
              {getDate(a.schedule.startDateTime,"mm")}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold text-foreground">
                {a.patient.name}
              </p>
              <StatusBadge status={a.status} />
            </div>
            {/* <p className="mt-0.5 text-xs text-muted-foreground">
                      {a.reason}
                    </p> */}
            <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
              {/* <span className="inline-flex items-center gap-1">
                        {a.mode === "VIDEO" ? (
                          <Video className="h-3 w-3" />
                        ) : (
                          <MapPin className="h-3 w-3" />
                        )}
                        {a.mode === "VIDEO" ? "Video" : "In-person"}
                      </span> */}
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {format(new Date(a.schedule.startDateTime), "hh:mm a")}–
                {format(new Date(a.schedule.endDateTime), "hh:mm a")}
              </span>
              <span>৳{a.doctor.appointmentFee}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {a.status === "INPROGRESS" ? (
              <Button size="sm">
                <Video className="h-4 w-4" />
                Resume
              </Button>
            ) : (
              <Button size="sm" variant="outline">
                <ClipboardList className="h-4 w-4" />
                Open
              </Button>
            )}
          </div>
        </li>
      ))}
    </ol>
  ) : (
    <p className="mt-4 text-sm text-muted-foreground">
      No appointments scheduled today.
    </p>
  );
};

export default TodaysAppointments;
