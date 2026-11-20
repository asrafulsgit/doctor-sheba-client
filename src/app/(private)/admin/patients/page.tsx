import AdminPatients from "@/components/admin/patients/Patients";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}>
        <AdminPatients />
      </Suspense>;
};

export default page;
