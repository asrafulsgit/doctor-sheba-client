"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { useMyPrescriptions } from "@/lib/hooks/usePrescription";
import PrescriptionCard from "./PrescriptionCard";
import PrescriptionCardSkeleton from "./PrescriptionCardSkeleton";
import { EmptyState } from "@/components/shared/PageState";
import { PrescriptionFilters } from "@/lib/query/query-keys";
import useQueryManager from "@/hooks/UseQueryManager";
import PrescriptionGrid from "./PrescriptionGrid";

const PatientPrescriptions = () => {
  return (
    <>
      <DashboardHeader
        title="Prescriptions"
        description="Digital prescriptions from your consultations."
      />

      <PrescriptionGrid />
    </>
  );
};

export default PatientPrescriptions;
