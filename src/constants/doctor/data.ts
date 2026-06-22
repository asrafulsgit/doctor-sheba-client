

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

export const DOCTOR_DESIGNATIONS = [
  "Medical Officer",
  "Junior Medical Officer",
  "Senior Medical Officer",

  "Intern Doctor",
  "Resident Medical Officer",
  "Resident Physician",
  "Resident Surgeon",
  "Chief Resident",

  "Registrar",
  "Senior Registrar",
  "Assistant Registrar",

  "Consultant",
  "Senior Consultant",
  "Visiting Consultant",
  "Chief Consultant",

  "Assistant Professor",
  "Associate Professor",
  "Professor",
  "Emeritus Professor",

  "Clinical Instructor",
  "Lecturer",
  "Senior Lecturer",

  "Department Head",
  "Head of Department (HOD)",
  "Medical Director",
  "Clinical Director",

  "Chief Medical Officer (CMO)",
  "Deputy Chief Medical Officer",

  "Attending Physician",
  "Attending Surgeon",

  "Specialist",
  "Senior Specialist",
  "Principal Specialist",

  "General Practitioner (GP)",
  "Family Physician",

  "Research Fellow",
  "Clinical Fellow",
  "Senior Clinical Fellow",

  "Emergency Physician",
  "Hospitalist",

  "Honorary Consultant",
  "Visiting Professor",
] as const;