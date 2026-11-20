import VerifyEmail from "@/components/auth/VerifyEmail";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}><VerifyEmail /></Suspense>;
};

export default page;
