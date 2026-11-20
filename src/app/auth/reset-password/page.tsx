import ResetPassword from "@/components/auth/ResetPassword";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}><ResetPassword /></Suspense>;
};

export default page;
