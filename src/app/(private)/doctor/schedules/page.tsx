import DoctorSchedules from "@/components/doctor/schedules/Schedules";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}><DoctorSchedules /></Suspense>;
};

export default page;
