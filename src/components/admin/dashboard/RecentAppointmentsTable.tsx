import { StatusBadge } from "@/components/ui/badge";
import { getDate } from "@/helpers/getDate";
import { IAppointment } from "@/types/appointment";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const RecentAppointmentsTable = ({
  appointments,
}: {
  appointments: IAppointment[];
}) => {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
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
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">Patient</th>
              <th className="px-4 py-2.5 text-left font-medium">Doctor</th>
              <th className="px-4 py-2.5 text-left font-medium">Date</th>
              <th className="px-4 py-2.5 text-left font-medium">Status</th>
              <th className="px-4 py-2.5 text-right font-medium">Fee</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {appointments.map((a) => (
              <tr key={a.id} className="hover:bg-surface/60">
                <td className="px-4 py-3 font-medium text-foreground">
                  {a.patient.name}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {a.doctor.name}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {getDate(a.schedule.startDateTime, "dd MMM · a")}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  ৳{a.doctor.appointmentFee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentAppointmentsTable;
