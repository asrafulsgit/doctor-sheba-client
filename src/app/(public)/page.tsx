import BecomeADoctor from "@/components/public/BecomeADoctor";
import EmergencyCta from "@/components/public/EmergencyCta";
import FeaturedDoctors from "@/components/public/FeaturedDoctors";
import FeaturedSpecialties from "@/components/public/FeaturedSpecialties";
import Hero from "@/components/public/Hero";
import HowItWorks from "@/components/public/HowItWorks";
import Services from "@/components/public/Services";
import Testimonials from "@/components/public/Testimonials";
import TrustedAndSafety from "@/components/public/TrustedAndSafety";
import WhyDoctorSheba from "@/components/public/WhyDoctorSheba";

const page = () => {
  return (
    <>
      <Hero />
      <FeaturedSpecialties />
      <FeaturedDoctors />
      <WhyDoctorSheba />
      <HowItWorks />
      <TrustedAndSafety />
      <Services />
      <BecomeADoctor />
      <Testimonials />
      <EmergencyCta />
    </>
  );
};

export default page;
