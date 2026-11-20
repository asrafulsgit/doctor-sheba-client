import DoctorPrescriptions from "@/components/doctor/prescriptions/Prescriptions";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}><DoctorPrescriptions /></Suspense>;
};

export default page;
