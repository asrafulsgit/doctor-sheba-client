import FeaturedDoctors from "@/components/public/FeaturedDoctors";
import FeaturedSpecialties from "@/components/public/FeaturedSpecialties";
import Hero from "@/components/public/Hero";

const page = () => {
  return (
    <>
      <Hero />
      <FeaturedSpecialties />
      <FeaturedDoctors />
    </>
  );
};

export default page;
