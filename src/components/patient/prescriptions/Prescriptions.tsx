import DashboardHeader from "@/components/shared/DashboardHeader";
import { Button } from "@/components/ui/button";
import { PRESCRIPTIONS } from "@/constants/patient/data";
import { useMyPrescriptions } from "@/lib/hooks/useprescription";
import { Calendar, Download, Pill } from "lucide-react";
import PrescriptionCard from "./PrescriptionCard";

// seo optimization
// export const Route = createFileRoute("/patient/prescriptions")({
//   head: () => ({ meta: [{ title: "Prescriptions — DoctorSheba" }] }),
//   component: PatientPrescriptions,
// });

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
const PatientPrescriptions = () => {
  const { data, isPending, isError, error } = useMyPrescriptions();

  const prescriptions = data?.data;
  return (
    <>
      <DashboardHeader
        title="Prescriptions"
        description="Digital prescriptions from your consultations."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {prescriptions?.map((rx) => (
          <PrescriptionCard prescription={rx} key={rx.id} />
        ))}
      </div>
    </>
  );
};

export default PatientPrescriptions;
