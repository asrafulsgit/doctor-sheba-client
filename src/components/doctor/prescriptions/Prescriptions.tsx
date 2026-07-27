"use client";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { EmptyState } from "@/components/shared/PageState";
import { useMyPrescriptions } from "@/lib/hooks/usePrescription";
import PrescriptionCard from "./PrescriptionCard";
import useQueryManager from "@/hooks/UseQueryManager";
import { PrescriptionFilters } from "@/lib/query/query-keys";
import PrescriptionFilter from "./PrescriptionFilter";
import PrescriptionCardSkeleton from "@/components/patient/prescriptions/PrescriptionCardSkeleton";
import { useState } from "react";
import { CustomDialog } from "@/hooks/useDialog";
import AppointmentPicker from "./AppointmentPicker";

// export const Route = createFileRoute("/doctor/prescriptions")({
//   head: () => ({ meta: [{ title: "Prescriptions — DoctorSheba" }] }),
//   component: DoctorPrescriptions,
// });

const DoctorPrescriptions = () => {
  const { getAllQueries } = useQueryManager();
  const filters: PrescriptionFilters = getAllQueries();

  const [isCreate, setIsCreate] = useState(false);

  const { data, isLoading, isError, error } = useMyPrescriptions(filters);
  const prescriptions = data?.data || [];

  return (
    <>
      <DashboardHeader
        title="Prescriptions"
        description="Prescriptions you've issued."
        actions={
          <Button onClick={() => setIsCreate(true)}>
            <Plus className="h-4 w-4" />
            New prescription
          </Button>
        }
      />
      <PrescriptionFilter />
      {isLoading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <PrescriptionCardSkeleton />
        </div>
      ) : prescriptions.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {prescriptions.map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No prescription found"
          description={isError ? error.message : "Try again later"}
        />
      )}

      <CustomDialog
        open={isCreate}
        onOpenChange={setIsCreate}
        title="Select a appointment"
      >
        <AppointmentPicker />
      </CustomDialog>
    </>
  );
};

export default DoctorPrescriptions;
