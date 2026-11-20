import AdminDoctors from "@/components/admin/doctors/Doctors";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={null}>
      <AdminDoctors />
    </Suspense>
  );
};

export default page;
