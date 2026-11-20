import PatientPayments from "@/components/patient/payments/Payments";
import { Suspense } from "react";
const page = () => {
  return (
    <Suspense fallback={null}>
      <PatientPayments />
    </Suspense>
  );
};

export default page;
