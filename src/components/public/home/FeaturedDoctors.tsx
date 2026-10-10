import { SectionHeading } from "../../shared/SectionHeading";
import { Button } from "../../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StaggerGroup, StaggerItem } from "../../shared/Reveal";
import { DoctorCard } from "../../shared/DoctorCard";
import { api } from "@/lib/api/api-client";
import { IDoctor } from "@/types/doctors";
import { ApiResponse } from "@/types/api-response";
import { EmptyState } from "@/components/shared/PageState";

const FeaturedDoctors = async () => {
  return (
    <section className="sm:border-b border-border bg-background py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Doctor directory"
            title="Meet doctors across key specialties"
            description="Compare experience, specialty, ratings, and consultation fees before choosing."
          />
          <Button variant="outline" asChild className="hidden sm:block">
            <Link href="/doctors">
              View all doctors <ArrowRight />
            </Link>
          </Button>
        </div>

        <DoctorsGrid />
      </div>
    </section>
  );
};

const DoctorsGrid = async () => {
  let doctors: IDoctor[] = [];
  let isError: any = null;
  try {
    const res = await api<ApiResponse<IDoctor[]>>("/doctor", {
      params: { limit: 6 },
    });
    doctors = res?.data || [];
  } catch (error: any) {
    isError = error;
  }

  if (doctors.length === 0) {
    return (
      <EmptyState
        title="No doctors found"
        description={"Please try again later."}
        className="mt-3"
      />
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Unable to load doctors"
        description={isError.message || "Please try again later."}
        className="mt-3"
      />
    );
  }

  return (
    <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {doctors.map((doctor) => (
        <StaggerItem key={doctor.id}>
          <DoctorCard doctor={doctor} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
};

export default FeaturedDoctors;
