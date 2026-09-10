import { IDoctorSchedule } from "@/types/doctors";
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

export type ScheduleWithBookingFlag = ISchedule & {
  isBooked?: boolean;
};
export function getDoctorSchedulesByDay(schedules: IDoctorSchedule[]) {
  const map = new Map<string, Array<ScheduleWithBookingFlag>>();

  for (const schedule of schedules) {
    const date = format(
      parseISO(schedule.schedule.startDateTime),
      "yyyy-MM-dd",
    );
    if (!map.has(date)) map.set(date, []);

    map.get(date)?.push({
      ...schedule.schedule,
      isBooked: schedule.isBooked,
    });
  }

  return Array.from(map, ([date, schedules]) => ({ date, schedules }));
}
