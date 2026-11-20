"use client";

import CreatePrescriptionForm from "./CreatePrescriptionForm";
import { useMyAppointment } from "@/lib/hooks/useAppointment";
import { useParams } from "next/navigation";
import { EmptyState } from "@/components/shared/PageState";
import PatientDetails from "./PatientDetails";
import { CreatePrescriptionFromSkeleton } from "./CreatePrescriptionFromSkeleton";

const CreatePrescription = () => {
  const appointmentId = useParams().appointmentId as string;
  const { data, isLoading, isError, error } = useMyAppointment(appointmentId);
  const appointment = data?.data;
  if (isLoading) {
    return <CreatePrescriptionFromSkeleton />;
  }
  if (!appointment || isError) {
    return (
      <EmptyState
        title={isError ? "Unable to load appointments" :"Appointment not found"}
        description={
          isError ? error.message : "When you have appointments, they'll show up here."
        }
      />
    );
  }
  return (
    <>
      {appointment && <PatientDetails appointment={appointment} />}

      <CreatePrescriptionForm />
    </>
  );
};

export default CreatePrescription;
