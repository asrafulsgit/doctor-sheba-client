"use client";

import { CalendarClock, Mail, Phone } from "lucide-react";
import CreatePrescriptionForm from "./CreatePrescriptionForm";

import { useMyAppointment } from "@/lib/hooks/useAppointment";
import { useParams } from "next/navigation";
import { bloodGroupLabels } from "@/constants/patient/data";
import { getDate } from "@/helpers/getDate";
import { EmptyState } from "@/components/shared/PageState";
import CreatePrescriptionFromSkeleton from "./CreatePrescriptionFromSkeleton";
import Image from "next/image";

// Helper – keep your existing fmtDT
function fmtDT(date: string | Date) {
  return new Date(date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const CreatePrescription = () => {
  const appointmentId = useParams().appointmentId as string;
  const { data, isLoading, isError, error } = useMyAppointment(appointmentId);
  const appointment = data?.data;
  if (isLoading) {
    return <CreatePrescriptionFromSkeleton />;
  }
  if (!appointment || isError) {
    <EmptyState
      title="Appointment not found"
      description={isError ? error.message : "Error while getting appointment"}
    />;
  }
  return (
    <>
      <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2">
        <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {appointment?.patient.profilePhoto ? (
            <Image
              src={appointment.patient.profilePhoto ?? ""}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
              width={60}
              height={60}
            />
          ) : (
            <span>{appointment?.patient.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-base font-semibold text-foreground truncate">
            {appointment?.patient.name}
          </p>
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-0.5 
        text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              {appointment?.patient.contactNumber}
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              {appointment?.patient.email}
            </span>
          </div>
          {appointment && (
            <p className="text-xs text-primary mt-0.5 inline-flex items-center gap-1">
              <CalendarClock className="h-3 w-3" />
              Linked visit ·{" "}
              {getDate(
                appointment.schedule.startDateTime,
                "dd MMM yyyy · hh:mm a",
              )}{" "}
              · {appointment.status}
            </p>
          )}
        </div>
      </div>

      <CreatePrescriptionForm />
    </>
  );
};

export default CreatePrescription;
