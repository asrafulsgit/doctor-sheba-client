import DoctorEarnings from "@/components/doctor/earnings/Earnings";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}><DoctorEarnings /></Suspense>;
};

export default page;
