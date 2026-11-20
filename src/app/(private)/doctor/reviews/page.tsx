import DoctorReviews from "@/components/doctor/reviews/Reviews";
import { Suspense } from "react";

const page = () => {
  return <Suspense fallback={null}><DoctorReviews /></Suspense>;
};

export default page;
