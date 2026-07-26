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

const AppointmentPicker = () => {
  const router = useRouter();
  const { getQuery, getAllQueries } = useQueryManager();

  const allQueries: AppointmentFilters = getAllQueries();
  const { data, isLoading, isError, error } = useMyAppointments({
    status: "INPROGRESS",
    limit: Number(getQuery("limi")) ?? 3,
    ...allQueries,
  });
  const appointments = data?.data;
  const onPick = (appointment: string) => {
    if (!appointment) return toast.error("Please pick an appointment.");
    router.push(`/doctor/prescriptions/${appointment}/create`);
  };
  return (
    <div className="space-y-3">
      <PrescriptionFilter />

      <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
        {isLoading ? (
          <></>
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
          <EmptyRow text="No matching appointments" />
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
      className="group flex w-full items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition hover:border-primary hover:shadow-soft"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
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
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {patient.name}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 
        text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Phone className="h-3.5 w-3.5" />
            {patient.contactNumber}
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <Mail className="h-3.5 w-3.5" />
            {patient.email}
          </span>
        </div>
        {appointment && (
          <p className="mt-1 truncate text-xs text-primary">
            <CalendarClock className="mr-1 inline h-3.5 w-3.5" />
            {getDate(
              appointment.schedule.startDateTime,
              "dd MMM yyyy · hh:mm a",
            )}{" "}
            · {appointment.status}
          </p>
        )}
      </div>
      <Check className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
    </button>
  );
}

function EmptyRow({ text }: { text: string }) {
  return (
    <div className="rounded-md border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
      {text}
    </div>
  );
}

export default AppointmentPicker;
{
  /* <EmptyRow text="No matching appointments" /> */
}
