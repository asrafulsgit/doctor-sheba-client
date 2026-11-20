import PatientMyDoctors from "@/components/patient/my-doctors/MyDoctors";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={null}>
      <PatientMyDoctors />
    </Suspense>
  );
};

export default page;
