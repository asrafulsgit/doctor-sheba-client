import { StatusBadge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDate } from "@/helpers/getDate";
import { IAppointment } from "@/types/appointment";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const headers = ["Patient", "Doctor", "Date", "Status", "Payment", "Fee"];

const RecentAppointmentsTable = ({
  appointments,
}: {
  appointments: IAppointment[];
}) => {
  return (
    <section className="rounded-2xl border border-border bg-card p-3 sm:p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">
          Recent appointments
        </h2>
        <Link
          href="/admin/appointments"
          className="text-xs font-medium text-primary hover:underline"
        >
          View all <ArrowRight className="ml-0.5 inline h-3 w-3" />
        </Link>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-border">
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
            {appointments.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium text-foreground">
                  {a.patient.name}
                </TableCell>
                <TableCell className="text-foreground">
                  {a.doctor.name}
                </TableCell>
                <TableCell className="text-foreground">
                  {getDate(a.schedule.startDateTime, "dd MMM · hh:mm a")}
                </TableCell>
                <TableCell>
                  <StatusBadge status={a.status} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={a.paymentStatus} />
                </TableCell>
                <TableCell className="text-foreground">
                  ৳{a.doctor.appointmentFee}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default RecentAppointmentsTable;
