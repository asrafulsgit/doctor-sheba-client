import { ISchedule } from "@/types/schedule";
import { format, parseISO } from "date-fns";

export function getSchedulesByDay(schedules: ISchedule[]) {
  const map = new Map();

  for (const schedule of schedules) {
    const date = format(parseISO(schedule.startDateTime), "yyyy-MM-dd");
    if (!map.has(date)) map.set(date, []);
    map.get(date).push(schedule);
  }

  return Array.from(map, ([date, schedules]) => ({ date, schedules }));
}
