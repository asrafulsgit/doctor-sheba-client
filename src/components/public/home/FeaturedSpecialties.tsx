import { Reveal, Stagger } from "../../shared/Reveal";
import SpecialtyCard from "@/components/shared/SpecialtyCard";
import { api } from "@/lib/api/api-client";
import { ISpecialty, Specialty } from "@/types/specialties";
import { ApiResponse } from "@/types/api-response";
import { EmptyState } from "@/components/shared/PageState";

const FeaturedSpecialties = async () => {
  return (
    <section className="sm:border-b border-border bg-surface py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Care for every specialty
          </h2>
          <p className="mt-3 text-muted-foreground">
            From cardiology to mental health — find the right specialist for
            you.
          </p>
        </Reveal>
        <SpecialtiesGrid />
      </div>
    </section>
  );
};

const SpecialtiesGrid = async () => {
  let specialties: Specialty[] = [];
  let isError: any = null;
  try {
    const res = await api<ApiResponse<Specialty[]>>("/specialties");
    specialties = res?.data || [];
  } catch (error: any) {
    isError = error;
  }

  if (specialties.length === 0) {
    return (
      <EmptyState
        title="No specialties found"
        description={"Please try again later."}
        className="mt-3"
      />
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Unable to load specialties"
        description={isError.message || "Please try again later."}
        className="mt-3"
      />
    );
  }

  return (
    <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {specialties.map((s) => (
        <SpecialtyCard specialty={s} key={s.id} />
      ))}
    </Stagger>
  );
};

export default FeaturedSpecialties;
