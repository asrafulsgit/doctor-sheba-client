import { Reveal, Stagger } from "../../shared/Reveal";
import SpecialtyCard from "@/components/shared/SpecialtyCard";
import { api } from "@/lib/api/api-client";
import { ISpecialty } from "@/types/specialties";
import { ApiResponse } from "@/types/api-response";
import { EmptyState } from "@/components/shared/PageState";

const FeaturedSpecialties = async () => {
  let specialties: ISpecialty[] = [];
  let errorMessage: string = "";
  try {
    const res = await api<ApiResponse<ISpecialty[]>>("/specialties");
    specialties = res?.data || [];
  } catch (error: any) {
    errorMessage = error?.message;
  }

  return (
    <section className="border-b border-border bg-surface py-20">
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
        {specialties.length !== 0 ? (
          <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {specialties.map((s) => (
              <SpecialtyCard specialty={s} key={s.id} />
            ))}
          </Stagger>
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

export default FeaturedSpecialties;
