import { IDoctorSchedule } from "@/types/doctors";
import { format, isSameDay } from "date-fns";

export const getSchedulesByDate = (
  schedules: IDoctorSchedule[],
  date: Date,
) => {
  return schedules
    .filter((item) => isSameDay(new Date(item.schedule.startDateTime), date))
    .map((item) => ({
      id: item.scheduleId,
      scheduleId: item.schedule.id,
      startTime: item.schedule.startDateTime,
      endTime: item.schedule.endDateTime,
      isBooked: item.isBooked,
    }));
};
