import AdminPayments from "@/components/admin/payments/Payments";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}>
      <AdminPayments />
    </Suspense>;
};

export default page;
