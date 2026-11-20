import DoctorAppointments from "@/components/doctor/appointments/Appointments";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}>
      <DoctorAppointments />
    </Suspense>;
};

export default page;
