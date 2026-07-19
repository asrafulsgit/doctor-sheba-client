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
import { Stethoscope } from "lucide-react";
import AppointmentActionMenu from "./AppointmentActionMenu";
import { format } from "date-fns";

const headers = [" ", "Doctor", "Date/Time", "Fee", "Status", "Action"];

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
                  <Stethoscope className="h-4 w-4" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-foreground">
                    {app.doctor.name}
                  </p>
                  <StatusBadge status={app.paymentStatus} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {app.doctor.designation}
                </p>
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
              <TableCell>{`BDT ${app.doctor.appointmentFee}`}</TableCell>

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
