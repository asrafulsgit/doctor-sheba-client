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
  let doctors: IDoctor[] = [];
  let errorMessage: string = "";
  try {
    const res = await api<ApiResponse<IDoctor[]>>("/doctor");
    doctors = res?.data || [];
  } catch (error: any) {
    errorMessage = error?.message;
  }
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
        {doctors.length !== 0 ? (
          <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <StaggerItem key={doctor.id}>
                <DoctorCard doctor={doctor} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <EmptyState
            title="Unable to load specialties"
            description={errorMessage || "Please try again later."}
            className="mt-3"
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedDoctors;
