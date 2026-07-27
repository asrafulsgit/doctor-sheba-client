import { Input } from "@/components/ui/input";
import { bloodGroupLabels } from "@/constants/patient/data";
import { getDate } from "@/helpers/getDate";
import useQueryManager from "@/hooks/UseQueryManager";
import { useMyAppointments } from "@/lib/hooks/useAppointment";
import { AppointmentFilters } from "@/lib/query/query-keys";
import { IAppointment } from "@/types/appointment";
import { IPatient } from "@/types/patient";
import { CalendarClock, Check, Mail, Phone, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import PrescriptionFilter from "./PrescriptionFilter";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/PageState";

const AppointmentPicker = () => {
  const router = useRouter();
  const { getQuery, getAllQueries } = useQueryManager();

  const allQueries: AppointmentFilters = getAllQueries();
  const { data, isLoading, isError, error } = useMyAppointments({
    limit: Number(getQuery("limit")) ?? 3,
    ...allQueries,
  });

  const appointments = data?.data?.filter((a) =>
    ["INPROGRESS", "COMPLETED"].includes(a.status),
  );
  const onPick = (appointment: string) => {
    if (!appointment) return toast.error("Please pick an appointment.");
    router.push(`/doctor/prescriptions/${appointment}/create`);
  };

  return (
    <div className="space-y-3 w-full">
      <PrescriptionFilter />

      <div className="max-h-105 space-y-2 overflow-y-auto pr-1">
        {isLoading ? (
          <>
            <PatientRowSkeleton />
          </>
        ) : appointments?.length ? (
          appointments?.map((a) => {
            const patient = a.patient;
            return (
              <PatientRow
                key={a.id}
                patient={patient}
                appointment={a}
                onPick={() => onPick(a.id)}
              />
            );
          })
        ) : (
          <EmptyState
            title={isError ? error.message : "No matching appointments"}
            description="Please try with correct info"
          />
        )}
      </div>
    </div>
  );
};

function PatientRow({
  patient,
  appointment,
  onPick,
}: {
  patient: IPatient;
  appointment?: IAppointment;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      className="group flex w-full items-center gap-1.5 sm:gap-3 rounded-lg border 
      border-border bg-card p-1.5 sm:p-3 text-left transition 
      hover:border-primary hover:shadow-soft"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center 
      rounded-full bg-primary/10 text-sm font-semibold text-primary"
      >
        {patient.profilePhoto ? (
          <Image
            src={patient.profilePhoto ?? ""}
            alt="Profile"
            className="h-full w-full rounded-2xl object-cover"
            width={40}
            height={40}
          />
        ) : (
          <span>{patient.name.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <div className="flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {patient.name}
        </p>

        <div
          className="flex items-center gap-x-3 gap-y-0.5 
        text-xs sm:text-sm text-muted-foreground"
        >
          {patient.contactNumber && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
              {patient.contactNumber}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Mail className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
            {patient.email}
          </span>
        </div>
        {appointment && (
          <p className="mt-1 truncate text-xs text-primary">
            <CalendarClock className="mr-1 inline h-3 sm:h-3.5 w-3 sm:w-3.5" />
            {getDate(
              appointment.schedule.startDateTime,
              "dd MMM yyyy · hh:mm a",
            )}{" "}
            · {appointment.status}
          </p>
        )}
      </div>
    </button>
  );
}

const PatientRowSkeleton = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <div className="flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3">
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-2/5" />

        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="hidden h-3.5 w-32 sm:block" />
        </div>

        <Skeleton className="h-3 w-1/3" />
      </div>

      <Skeleton className="h-4 w-4 shrink-0 rounded-sm" />
    </div>
  ));
};

export default AppointmentPicker;
