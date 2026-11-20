import AdminAppointments from "@/components/admin/appointments/Appointments";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={null}>
      <AdminAppointments />
    </Suspense>
  );
};

export default page;
