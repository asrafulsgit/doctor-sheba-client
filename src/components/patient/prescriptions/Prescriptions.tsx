"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { useMyPrescriptions } from "@/lib/hooks/usePrescription";
import PrescriptionCard from "./PrescriptionCard";
import PrescriptionCardSkeleton from "./PrescriptionCardSkeleton";
import { EmptyState } from "@/components/shared/PageState";
import { PrescriptionFilters } from "@/lib/query/query-keys";
import useQueryManager from "@/hooks/UseQueryManager";

// seo optimization
// export const Route = createFileRoute("/patient/prescriptions")({
//   head: () => ({ meta: [{ title: "Prescriptions — DoctorSheba" }] }),
//   component: PatientPrescriptions,
// });

const PatientPrescriptions = () => {
  const { getAllQueries } = useQueryManager();
  const filters: PrescriptionFilters = getAllQueries();
  const { data, isLoading, isError, error } = useMyPrescriptions(filters);

  const prescriptions = data?.data || [];
  return (
    <>
      <DashboardHeader
        title="Prescriptions"
        description="Digital prescriptions from your consultations."
      />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          <PrescriptionCardSkeleton />
        </div>
      ) : prescriptions?.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {prescriptions?.map((rx) => (
            <PrescriptionCard prescription={rx} key={rx.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No prescription found"
          description="Try again later"
        />
      )}
    </>
  );
};

export default PatientPrescriptions;
