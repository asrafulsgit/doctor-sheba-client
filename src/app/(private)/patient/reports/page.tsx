import PatientReports from "@/components/patient/reports/Reports";
import { Suspense } from "react";
const page = () => {
  return (
    <Suspense fallback={null}>
      <PatientReports />
    </Suspense>
  );
};

export default page;
