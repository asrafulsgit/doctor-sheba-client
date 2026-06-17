import { Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { getDoctorSchedule } from "@/constants/doctor/data";

// seo optimization
// export const Route = createFileRoute("/doctor/schedules")({
//   head: () => ({ meta: [{ title: "Schedules — DoctorSheba" }] }),
//   component: DoctorSchedules,
// });

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DoctorSchedules = () => {
  const weekDate = (i: number) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };
  return (
    <>
      <DashboardHeader
        title="Schedules"
        description="Define your weekly availability and time slots."
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            Add slot
          </Button>
        }
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div className="grid grid-cols-7 gap-3">
          {DAYS.map((day, i) => {
            const sched = getDoctorSchedule("doc-001", i);
            return (
              <div
                key={day}
                className="rounded-xl border border-border bg-surface p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">{day}</p>
                  <span className="text-[10px] text-muted-foreground">
                    {weekDate(i)}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {sched.slots.map((s) => {
                    const t = new Date(s.startTime).toLocaleTimeString(
                      "en-GB",
                      { hour: "2-digit", minute: "2-digit" },
                    );
                    return (
                      <li
                        key={s.id}
                        className={cn(
                          "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs",
                          s.isBooked
                            ? "bg-primary-soft text-primary"
                            : "bg-background text-foreground border border-border",
                        )}
                      >
                        <Clock className="h-3 w-3" />
                        {t}
                        {s.isBooked && (
                          <span className="ml-auto text-[9px] uppercase">
                            Booked
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DoctorSchedules;
