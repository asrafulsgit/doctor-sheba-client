"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { StatusBadge } from "@/components/ui/badge";

import { IAppointment } from "@/types/appointment";
import AppointmentActionMenu from "./AppointmentActionMenu";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const headers = [
  " ",
  "NAME",
  "EMAIL",
  "DATE/TIME",
  "PAYMENT STATUS",
  "STATUS",
  "ACTION",
];

const AppointmentTable = ({
  appointments,
}: {
  appointments: IAppointment[];
}) => {
  return (
    <div className="mt-2 overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((h) => (
              <TableHead
                key={h}
                className="uppercase text-xs text-muted-foreground px-4"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {appointments.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="flex gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  {app.patient.profilePhoto ? (
                    <Image
                      src={app.patient.profilePhoto ?? ""}
                      alt="Profile"
                      className="h-full w-full rounded-2xl object-cover"
                      width={10}
                      height={10}
                    />
                  ) : (
                    <span>{app.patient.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Link href={`/doctor/patients/${app.patient.id}`} className="font-medium text-foreground hover:text-primary hover:underline">
                {app.patient.name}
                </Link>
              </TableCell>
              <TableCell>
                <p className="text-foreground">{app.patient.email}</p>
              </TableCell>
              <TableCell>
                <p>
                  {format(new Date(app.schedule.startDateTime), "dd MMM yyyy")}
                </p>
                <p>
                  <span>
                    {format(new Date(app.schedule.startDateTime), "hh:mm a")}
                  </span>{" "}
                  -{" "}
                  <span>
                    {format(new Date(app.schedule.endDateTime), "hh:mm a")}
                  </span>
                </p>
              </TableCell>

              <TableCell>
                <StatusBadge status={app.paymentStatus} />
              </TableCell>

              <TableCell>
                <StatusBadge status={app.status} />
              </TableCell>

              <TableCell className="text-center">
                <AppointmentActionMenu appointment={app} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentTable;
