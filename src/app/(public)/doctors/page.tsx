import Doctors from "@/components/public/doctors/Doctors";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}><Doctors /></Suspense>;
};

export default page;
