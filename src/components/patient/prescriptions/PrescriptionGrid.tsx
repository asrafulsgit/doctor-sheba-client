import useQueryManager from "@/hooks/UseQueryManager";
import { useMyPrescriptions } from "@/lib/hooks/usePrescription";
import { PrescriptionFilters } from "@/lib/query/query-keys";
import React from "react";
import PrescriptionCardSkeleton from "./PrescriptionCardSkeleton";
import PrescriptionCard from "./PrescriptionCard";
import { EmptyState } from "@/components/shared/PageState";

const PrescriptionGrid = () => {
  const { getAllQueries } = useQueryManager();
  const filters: PrescriptionFilters = getAllQueries();
  const { data, isLoading, isError, error } = useMyPrescriptions(filters);

  const prescriptions = data?.data || [];

  if (isLoading)
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <PrescriptionCardSkeleton />
      </div>
    );

  if (isError || !prescriptions.length) {
    return (
      <EmptyState
        title={
          isError ? "Unable to load prescription" : "No prescription found"
        }
        description={isError ? error.message : ""}
      />
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {prescriptions?.map((rx) => (
        <PrescriptionCard prescription={rx} key={rx.id} />
      ))}
    </div>
  );
};

export default PrescriptionGrid;
