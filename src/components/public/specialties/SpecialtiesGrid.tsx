"use client";
import { EmptyState } from "@/components/shared/PageState";
import { StaggerGroup, StaggerItem } from "@/components/shared/Reveal";
import { SpecialtyCardSkeleton } from "@/components/shared/SkeletonSet";
import SpecialtyCard from "@/components/shared/SpecialtyCard";
import { useSpecialties } from "@/lib/hooks/UseSpecialty";

const SpecialtiesGrid = () => {
  const { data, isLoading, isError, error } = useSpecialties();
  const specialties = data?.data ?? [];
  if (isLoading)
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <SpecialtyCardSkeleton rows={5} />
      </div>
    );
  if (isError || !specialties.length) {
    return (
      <EmptyState
        title={isError ? "Unable to load specialties" : "No specialties found"}
        description={isError ? error.message : ""}
      />
    );
  }

  return (
    <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {specialties.map((specialty) => (
        <StaggerItem key={specialty.id}>
          <SpecialtyCard specialty={specialty} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
};

export default SpecialtiesGrid;
