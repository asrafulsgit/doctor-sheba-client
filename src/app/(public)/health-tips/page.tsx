import HealthTips from "@/components/public/health-tips/HealthTips"; 
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}><HealthTips /></Suspense>;
};

export default page;
