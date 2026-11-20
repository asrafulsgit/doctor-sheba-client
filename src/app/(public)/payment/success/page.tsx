import PaymentSuccess from "@/components/patient/payment/Success";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}><PaymentSuccess /></Suspense>;
};

export default page;
