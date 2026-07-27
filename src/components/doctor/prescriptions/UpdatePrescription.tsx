"use client";
import { useMyAppointment } from "@/lib/hooks/useAppointment";
import { useParams } from "next/navigation";
import { EmptyState } from "@/components/shared/PageState";
import PatientDetails from "./PatientDetails";
import UpdatePrescriptionForm from "./UpdatePrescriptionForm";
import { CreatePrescriptionFromSkeleton } from "./CreatePrescriptionFromSkeleton";

const UpdatePrescription = () => {
  const appointmentId = useParams().appointmentId as string;
  const { data, isLoading, isError, error } = useMyAppointment(appointmentId);
  const appointment = data?.data;
  if (isLoading) {
    return <CreatePrescriptionFromSkeleton />;
  }
  if (!appointment || isError) {
    return (
      <EmptyState
        title={isError ? error.message : "Appointment not found"}
        description={"Error while getting appointment, Please try again!"}
      />
    );
  }
  return (
    <>
      {appointment && <PatientDetails appointment={appointment} />}

      <UpdatePrescriptionForm />
    </>
  );
};

export default UpdatePrescription;
