import PatientPrescriptions from "@/components/patient/prescriptions/Prescriptions";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={null}>
      <PatientPrescriptions />
    </Suspense>
  );
};

export default page;
