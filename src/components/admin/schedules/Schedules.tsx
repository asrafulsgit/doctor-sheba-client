"use client";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { useState } from "react";
import { Schedule } from "@/types/public";
import { featuredDoctors } from "@/constants/public/doctors";
import { getDoctorSchedule } from "@/constants/doctor/data";

// export const Route = createFileRoute("/admin/schedules")({
//   head: () => ({ meta: [{ title: "Schedules — Admin — DoctorSheba" }] }),
//   component: AdminSchedules,
// });

const AdminSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  return (
    <>
      <DashboardHeader
        title="Schedules"
        description="Overview of doctor availability today."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {featuredDoctors.slice(0, 6).map((d) => {
          const today = getDoctorSchedule(d.id, 0);
          const booked = today.slots.filter((s) => s.isBooked).length;
          return (
            <article
              key={d.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <header className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{d.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {d?.specialties && d?.specialties[0]?.title}
                  </p>
                </div>
                <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-primary">
                  {booked}/{today.slots.length} booked
                </span>
              </header>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {today.slots.map((s) => {
                  const t = new Date(s.startTime).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <span
                      key={s.id}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs",
                        s.isBooked
                          ? "bg-primary-soft text-primary"
                          : "border border-border bg-surface text-muted-foreground",
                      )}
                    >
                      <Clock className="h-3 w-3" />
                      {t}
                    </span>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default AdminSchedules;
