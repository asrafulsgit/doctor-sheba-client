import DoctorPatients from "@/components/doctor/patients/Patients";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}><DoctorPatients /></Suspense>;
};

export default page;
