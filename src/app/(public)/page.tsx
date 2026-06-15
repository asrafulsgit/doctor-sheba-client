import BecomeADoctor from "@/components/public/home/BecomeADoctor";
import EmergencyCta from "@/components/public/home/EmergencyCta";
import FeaturedDoctors from "@/components/public/home/FeaturedDoctors";
import FeaturedSpecialties from "@/components/public/home/FeaturedSpecialties";
import Hero from "@/components/public/home/Hero";
import HowItWorks from "@/components/public/home/HowItWorks";
import Services from "@/components/public/home/Services";
import Testimonials from "@/components/public/home/Testimonials";
import TrustedAndSafety from "@/components/public/home/TrustedAndSafety";
import WhyDoctorSheba from "@/components/public/home/WhyDoctorSheba";

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
