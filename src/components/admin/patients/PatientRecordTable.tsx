"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { bloodGroupLabels } from "@/constants/patient/data";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Power } from "lucide-react";
import { getDate } from "@/helpers/getDate";
import useQueryManager from "@/hooks/UseQueryManager";
import { PatientFilters } from "@/lib/query/query-keys";
import {
  AdminPatient,
  usePatientsAdmin,
  useSuspendOrActivatePatient,
} from "@/lib/hooks/usePatient";
import RowSkeleton from "@/components/shared/SkeletonSet";
import { EmptyState } from "@/components/shared/PageState";
import { memo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const headers = [
  "PATIENT",
  "DOB / GENDER",
  "BLOOD",
  "CONTACT",
  "LAST VISIT",
  "VISITS",
  "ACTION",
];

const PatientRecordTable = () => {
  const router = useRouter();
  const { getAllQueries } = useQueryManager();
  const [suspendTarget, setSuspendTarget] = useState<AdminPatient | null>(null);
  const allQueries: PatientFilters = getAllQueries();
  const { data, isLoading, isError, error } = usePatientsAdmin(allQueries);
  const patients = data?.data;

  const {
    mutate: updateSuspendOrActivate,
    isPending,
    variables,
  } = useSuspendOrActivatePatient();

  const handleView = useCallback(
    (id: string) => router.push(`/admin/patients/${id}`),
    [router],
  );

  const handleActivate = useCallback((patient: AdminPatient) => {
    updateSuspendOrActivate(
      { id: patient.id, isDelete: false },
      {
        onSuccess: () => toast.success(`${patient.name} activated`),
        onError: (err: Error) =>
          toast.error(err.message || "Failed to activate patient"),
      },
    );
  }, []);

  const handleRequestSuspend = useCallback((patient: AdminPatient) => {
    setSuspendTarget(patient);
  }, []);

  const handleConfirmSuspend = useCallback(() => {
    if (!suspendTarget) return;
    updateSuspendOrActivate(
      { id: suspendTarget.id, isDelete: true },
      {
        onSuccess: () => {
          toast.success(`${suspendTarget.name} suspended`);
          setSuspendTarget(null);
        },
        onError: (err: Error) => {
          toast.error(err.message || "Failed to suspend doctor");
        },
      },
    );
  }, [suspendTarget]);

  if (isLoading)
    return (
      <div className="mt-2">
        <RowSkeleton />
      </div>
    );

  if (isError || patients?.length === 0) {
    return (
      <EmptyState
        title="Nothing here yet"
        description={
          isError
            ? error.message
            : "When you have patients, they'll show up here."
        }
        className="mt-2"
      />
    );
  }
  return (
    <>
      <div className="mt-2 overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((h) => (
                <TableHead
                  key={h}
                  className="uppercase text-xs text-muted-foreground px-2"
                >
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {patients?.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                isPending={isPending && variables?.id === patient.id}
                onView={handleView}
                onActivate={handleActivate}
                onRequestSuspend={handleRequestSuspend}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog
        open={!!suspendTarget}
        onOpenChange={(o) => !o && setSuspendTarget(null)}
        title="Suspend this patient?"
        description={
          suspendTarget
            ? `${suspendTarget.name} will be hidden from patients.`
            : ""
        }
        confirmLabel="Suspend"
        destructive
        onConfirm={handleConfirmSuspend}
      />
    </>
  );
};

type PatientRowProps = {
  patient: AdminPatient;
  isPending: boolean;
  onView: (id: string) => void;
  onActivate: (patient: AdminPatient) => void;
  onRequestSuspend: (patient: AdminPatient) => void;
};

const PatientRow = memo(function PatientRow({
  patient,
  isPending,
  onView,
  onActivate,
  onRequestSuspend,
}: PatientRowProps) {
  return (
    <TableRow key={patient.id}>
      <TableCell className="flex gap-2">
        <Link
          href={`/doctor/patients/${patient.id}`}
          className="flex items-center gap-3 text-left"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
            {patient.profilePhoto ? (
              <Image
                src={patient.profilePhoto ?? ""}
                alt="Profile"
                className="h-full w-full rounded-2xl object-cover"
                width={38}
                height={40}
              />
            ) : (
              <span>{patient.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <p className="font-medium text-foreground hover:text-primary hover:underline">
              {patient.name}
            </p>
            <p className="text-xs text-muted-foreground">{patient.email}</p>
          </div>
        </Link>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {patient?.patientHealthData?.dateOfBirth || "N/A"} ·{" "}
        {patient?.patientHealthData?.gender === "MALE" ? "Male" : "Female"}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {patient?.patientHealthData?.bloodGroup && (
          <span className="rounded-md bg-destructive-soft px-2 py-0.5 text-xs font-medium text-destructive">
            {bloodGroupLabels[patient.patientHealthData.bloodGroup]}
          </span>
        )}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {patient.contactNumber ?? "N/A"}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {patient?.appointments[0]?.schedule.startDateTime
          ? getDate(
              patient.appointments[0].schedule.startDateTime,
              "dd MMM yyyy",
            )
          : "N/A"}
      </TableCell>
      <TableCell className="font-medium">
        {patient._count.appointments}
      </TableCell>

      <TableCell className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" disabled={isPending}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(patient.id)}>
              <Eye className="h-4 w-4" />
              View
            </DropdownMenuItem>

            {patient.isDeleted ? (
              <DropdownMenuItem
                disabled={isPending}
                onClick={() => onActivate(patient)}
              >
                <Power className="h-4 w-4" />
                Activate
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="text-destructive"
                disabled={isPending}
                onClick={() => onRequestSuspend(patient)}
              >
                <Power className="h-4 w-4" />
                Suspend
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});

export default PatientRecordTable;
