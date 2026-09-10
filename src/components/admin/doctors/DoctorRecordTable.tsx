"use client";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/PageState";
import RowSkeleton from "@/components/shared/SkeletonSet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useQueryManager from "@/hooks/UseQueryManager";
import {
  useDoctors,
  useDoctorsAdmin,
  useSuspendOrActivateDoctor,
} from "@/lib/hooks/UseDoctor";
import { IDoctor, IDoctorFilter } from "@/types/doctors";
import {
  Edit3,
  Eye,
  ListChecks,
  MoreHorizontal,
  Power,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useState } from "react";
import { toast } from "sonner";

const headers = [
  "DOCTOR",
  "Specialty",
  "BMDC",
  "Hospital",
  "Fee",
  "Rating",
  "ACTION",
];

type DoctorRowProps = {
  doctor: IDoctor;
  isPending: boolean;
  onView: (id: string) => void;
  onSchedules: (id: string) => void;
  onActivate: (doctor: IDoctor) => void;
  onRequestSuspend: (doctor: IDoctor) => void;
};

const DoctorRow = memo(function DoctorRow({
  doctor,
  isPending,
  onView,
  onSchedules,
  onActivate,
  onRequestSuspend,
}: DoctorRowProps) {
  return (
    <TableRow>
      <TableCell className="flex gap-2">
        <Link
          href={`/doctor/doctors/${doctor.id}`}
          className="flex items-center gap-3 text-left"
        >
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">
            {doctor.profilePhoto ? (
              <Image
                src={doctor.profilePhoto}
                alt="Profile"
                className="h-full w-full rounded-2xl object-cover"
                width={36}
                height={36}
              />
            ) : (
              <span>{doctor?.name?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <p className="flex items-center gap-1 font-medium text-foreground hover:text-primary hover:underline">
              {doctor.name}
            </p>
            <p className="text-xs text-muted-foreground">{doctor.email}</p>
          </div>
        </Link>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {doctor.doctorSpecialities?.[0]?.specialities.title}
      </TableCell>
      <TableCell className="font-mono text-xs text-muted-foreground">
        {doctor.registrationNumber}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {doctor.currentWorkingPlace}
      </TableCell>
      <TableCell className="font-medium">৳{doctor.appointmentFee}</TableCell>
      <TableCell>
        <span className="inline-flex items-center gap-0.5 font-medium text-warning-foreground">
          <Star className="h-3 w-3 fill-current" />
          {doctor.averageRating}
        </span>
      </TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" disabled={isPending}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(doctor.id)}>
              <Eye className="h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSchedules(doctor.id)}>
              <ListChecks className="h-4 w-4" />
              Schedules
            </DropdownMenuItem>

            {doctor.isDeleted ? (
              <DropdownMenuItem
                disabled={isPending}
                onClick={() => onActivate(doctor)}
              >
                <Power className="h-4 w-4" />
                Activate
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="text-destructive"
                disabled={isPending}
                onClick={() => onRequestSuspend(doctor)}
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

const DoctorRecordTable = () => {
  const router = useRouter();
  const { getAllQueries } = useQueryManager();
  const [suspendTarget, setSuspendTarget] = useState<IDoctor | null>(null);

  const allQueries: IDoctorFilter = getAllQueries();
  const { data, isLoading, isError, error } = useDoctorsAdmin(allQueries);
  const doctors = data?.data || [];

  const {
    mutate: updateSuspendOrActivate,
    isPending,
    variables,
  } = useSuspendOrActivateDoctor();

  const handleView = useCallback(
    (id: string) => router.push(`/doctors/${id}`),
    [router],
  );

  const handleSchedules = useCallback(
    (id: string) => router.push(`/admin/doctors/schedules/${id}`),
    [router],
  );

  const handleActivate = useCallback((doctor: IDoctor) => {
    updateSuspendOrActivate(
      { id: doctor.id, isDelete: false },
      {
        onSuccess: () => toast.success(`${doctor.name} activated`),
        onError: (err: Error) =>
          toast.error(err.message || "Failed to activate doctor"),
      },
    );
  }, []);

  const handleRequestSuspend = useCallback((doctor: IDoctor) => {
    setSuspendTarget(doctor);
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

  if (isError || doctors.length === 0) {
    return (
      <EmptyState
        title="Nothing here yet"
        description={
          isError
            ? error.message
            : "When you have doctors, they'll show up here."
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
            {doctors.map((doctor) => (
              <DoctorRow
                key={doctor.id}
                doctor={doctor}
                isPending={isPending && variables?.id === doctor.id}
                onView={handleView}
                onSchedules={handleSchedules}
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
        title="Suspend this doctor?"
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

export default DoctorRecordTable;
