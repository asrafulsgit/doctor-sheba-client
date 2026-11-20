import PatientAppointments from "@/components/patient/appointments/Appointments";
import { Suspense } from "react";
const page = () => {
  return <Suspense fallback={null}><PatientAppointments /></Suspense>;
};

export default page;
