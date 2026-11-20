import AdminSchedules from "@/components/admin/schedules/Schedules";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={null}>
      <AdminSchedules />
    </Suspense>
  );
};

export default page;
