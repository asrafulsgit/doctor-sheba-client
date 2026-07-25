import { getSchedulesByDay } from "@/helpers/getSchedulesByDay";
import useQueryManager from "@/hooks/UseQueryManager";
import { useDoctorAvailableSchedules } from "@/lib/hooks/schedule";
import { DoctorAvailableSchedulesFilters } from "@/lib/query/query-keys";
import { cn } from "@/lib/utils";
import { ISchedule } from "@/types/schedule";
import { format } from "date-fns";
import { CalendarDays, CheckCircle2, Circle } from "lucide-react";
import React, { useState } from "react";
import SchedulesSkeleton from "./SchedulesSkeleton";
import { EmptyState } from "@/components/shared/PageState";

const AvailableSchedules = () => {
  const { getAllQueries } = useQueryManager();

  const [selectedSchedules, setSelectedules] = useState<string[]>([]);
  const allQueries: DoctorAvailableSchedulesFilters = getAllQueries();
  const { data, isLoading, isError, error } =
    useDoctorAvailableSchedules(allQueries);
  const schedules = data?.data;
  const formattedSchedules = schedules ? getSchedulesByDay(schedules) : [];

  const toggleSlot = (id: string) => {
    setSelectedules((prev) =>
      prev.includes(id)
        ? prev.filter((slotId) => slotId !== id)
        : [...prev, id],
    );
  };

  if (isLoading) return <SchedulesSkeleton />;
  if (isError)
    return (
      <EmptyState
        title="Someting went wrong"
        description={error.message ? error.message : "No scheduled slots found"}
      />
    );
  return formattedSchedules.length ? (
    <div className="grid gap-2 sm:gap-3 grid-cols-2  sm:grid-cols-3 lg:grid-cols-4">
      {formattedSchedules.map(({ date, schedules }) => {
        return (
          <article
            key={date}
            className={cn(
              "rounded-2xl border border-border bg-card p-2 sm:p-5 shadow-soft transition",
            )}
          >
            <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <CalendarDays className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary" />
                <p className="text-sm sm:text-base font-semibold text-foreground">
                  {format(date, "EEE, d MMMM yyyy")}
                </p>
              </div>
            </header>
            <div className="flex flex-col gap-2">
              {schedules.map((s: ISchedule) => {
                const selected = selectedSchedules.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSlot(s.id)}
                    className={cn(
                      "flex justify-start items-center gap-1 sm:gap-1.5 rounded-lg border px-1.5 py-1 sm:px-2 md:px-2.5 sm:py-1.5 text-xs sm:text-sm transition",
                      selected
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-surface text-foreground hover:border-primary/50 hover:bg-primary-soft",
                    )}
                  >
                    {selected ? (
                      <CheckCircle2 className= "h-3 sm:h-3.5  w-3 sm:w-3.5" />
                    ) : (
                      <Circle className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                    )}
                    {format(s.startDateTime, "hh:mm a")} –{" "}
                    {format(s.endDateTime, "hh:mm a")}
                  </button>
                );
              })}
            </div>
          </article>
        );
      })}
    </div>
  ) : (
    <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground shadow-soft">
      No published slots from admin yet.
    </div>
  );
};

export default AvailableSchedules;
