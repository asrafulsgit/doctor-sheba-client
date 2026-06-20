"use client"
import * as React from "react";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  MoreHorizontal,
  Eye,
  X,
  AlertTriangle,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InfoDialog } from "@/components/shared/FormDialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppointmentRecord, APPOINTMENTS } from "@/constants/patient/data";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { StatusBadge } from "@/components/ui/badge";

// export const Route = createFileRoute("/admin/appointments")({
//   head: () => ({ meta: [{ title: "Appointments — Admin — DoctorSheba" }] }),
//   component: AdminAppointments,
// });

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

const AdminAppointments = () => {
  const [q, setQ] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [appointments, setAppointments] =
    React.useState<AppointmentRecord[]>(APPOINTMENTS);
  const [view, setView] = React.useState<AppointmentRecord | null>(null);
  const [cancel, setCancel] = React.useState<AppointmentRecord | null>(null);
  const [conflict, setConflict] = React.useState<AppointmentRecord | null>(
    null,
  );

  const doCancel = () => {
    if (!cancel) return;
    // set((prev) => prev.map((a) => a.id === cancel.id ? { ...a, status: "CANCELED" } : a));
    toast.success("Appointment cancelled");
  };
  const resolveConflict = () => {
    if (!conflict) return;
    // set((prev) => prev.map((a) => a.id === conflict.id ? { ...a, status: "SCHEDULED" } : a));
    toast.success("Conflict resolved");
  };

  return (
    <>
      <DashboardHeader
        title="Appointments"
        description="Platform-wide appointment activity."
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by patient, doctor, ID…"
            className="pl-9"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">All statuses</option>
          <option>SCHEDULED</option>
          <option>INPROGRESS</option>
          <option>COMPLETED</option>
          <option>CANCELED</option>
        </select>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">ID</th>
              <th className="px-4 py-3 text-left font-medium">Patient</th>
              <th className="px-4 py-3 text-left font-medium">Doctor</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Mode</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Payment</th>
              <th className="px-4 py-3 text-right font-medium">Fee</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {appointments.map((a) => (
              <tr key={a.id} className="hover:bg-surface/60">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {a.id}
                </td>
                <td className="px-4 py-3 font-medium text-foreground">
                  {a.patientName}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {a.doctorName}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  <Calendar className="inline h-3 w-3" /> {fmt(a.date)}{" "}
                  <Clock className="inline h-3 w-3" /> {a.startTime}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {a.mode === "VIDEO" ? (
                    <>
                      <Video className="inline h-3 w-3" /> Video
                    </>
                  ) : (
                    <>
                      <MapPin className="inline h-3 w-3" /> In-person
                    </>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={a.status} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={a.paymentStatus} />
                </td>
                <td className="px-4 py-3 text-right font-medium">৳{a.fee}</td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => {}}>
                        <Eye className="h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {}}>
                        <AlertTriangle className="h-4 w-4" />
                        Resolve conflict
                      </DropdownMenuItem>
                      {(a.status === "SCHEDULED" ||
                        a.status === "INPROGRESS") && (
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {}}
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  No appointments match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <InfoDialog
        open={!!view}
        onOpenChange={(o) => !o && setView(null)}
        title="Appointment details"
      >
        {view && (
          <div className="space-y-2 text-sm">
            {(
              [
                ["ID", view.id],
                ["Patient", view.patientName],
                ["Doctor", view.doctorName],
                ["Specialty", view.specialty],
                ["Reason", view.reason],
                ["Date", fmt(view.date)],
                ["Time", `${view.startTime} – ${view.endTime}`],
                ["Mode", view.mode],
                ["Fee", `৳${view.fee}`],
                ["Status", view.status],
                ["Payment", view.paymentStatus],
              ] as const
            ).map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between rounded-md border border-border px-3 py-2"
              >
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        )}
      </InfoDialog>

      <ConfirmDialog
        open={!!cancel}
        onOpenChange={(o) => !o && setCancel(null)}
        title="Cancel this appointment?"
        destructive
        confirmLabel="Cancel"
        onConfirm={doCancel}
      />
      <ConfirmDialog
        open={!!conflict}
        onOpenChange={(o) => !o && setConflict(null)}
        title="Resolve scheduling conflict?"
        description="Re-confirm and notify both parties."
        confirmLabel="Resolve"
        onConfirm={resolveConflict}
      />
    </>
  );
};

export default AdminAppointments;
