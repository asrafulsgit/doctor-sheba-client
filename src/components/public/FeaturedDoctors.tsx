import { SectionHeading } from "../shared/SectionHeading";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StaggerGroup, StaggerItem } from "../shared/Reveal";
import { featuredDoctors } from "@/constants/public/doctors";
import { DoctorCard } from "../shared/DoctorCard";

const FeaturedDoctors = () => {
  return (
    <section className="border-b border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Doctor directory"
            title="Meet doctors across key specialties"
            description="Compare experience, specialty, ratings, and consultation fees before choosing."
          />
          <Button variant="outline" asChild>
            <Link href="/doctors">
              View all doctors <ArrowRight />
            </Link>
          </Button>
        </div>
        <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredDoctors.map((doctor) => (
            <StaggerItem key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
