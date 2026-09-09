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
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const headers = [
  "Patient",
  "Doctor",
  "DATE/TIME",
  "STATUS",
  "PAYMENT",
  "FEE",
  // "ACTION",
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
                className="uppercase text-xs text-muted-foreground"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {appointments.map((app) => (
            <TableRow key={app.id}>
              <TableCell>
                <Link
                  href={`/admin/patients/${app.patient.id}`}
                  className="font-medium text-foreground hover:text-primary hover:underline"
                >
                  {app.patient.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/doctors/${app.doctor.id}`}
                  className="font-medium text-foreground hover:text-primary hover:underline"
                >
                  {app.doctor.name}
                </Link>
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
                <StatusBadge status={app.status} />
              </TableCell>

              <TableCell>
                <StatusBadge status={app.paymentStatus} />
              </TableCell>

              <TableCell>
                {app.doctor.appointmentFee}
              </TableCell>

              {/* <TableCell className="text-center">
                <AppointmentActionMenu appointment={app} />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentTable;
