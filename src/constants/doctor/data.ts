

export interface SlotGroup {
  date: string;
  slots: Array<{ id: string; startTime: string; endTime: string; isBooked: boolean }>;
}
export function getDoctorSchedule(doctorId: string, dayOffset: number): SlotGroup {
  const day = new Date();
  day.setDate(day.getDate() + dayOffset);
  const yyyyMmDd = day.toISOString().slice(0, 10);
  const slots = [];
  for (let h = 10; h < 17; h++) {
    const id = `${doctorId}-${yyyyMmDd}-${h}`;
    const start = new Date(day);
    start.setHours(h, 0, 0, 0);
    const end = new Date(start);
    end.setHours(h + 1);
    const booked = (h + dayOffset + doctorId.length) % 4 === 0;
    slots.push({ id, startTime: start.toISOString(), endTime: end.toISOString(), isBooked: booked });
  }
  return { date: yyyyMmDd, slots };
}