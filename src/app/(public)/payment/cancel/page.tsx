import PaymentCancel from "@/components/patient/payment/Cancel";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}>
      <PaymentCancel />
    </Suspense>;
};

export default page;
