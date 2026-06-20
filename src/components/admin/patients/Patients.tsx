import * as React from "react";
import { Search, MoreHorizontal, Eye, Power } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Patient } from "@/types/public";
import { PatientRecord, PATIENTS } from "@/constants/patient/data";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { StatusBadge } from "@/components/ui/badge";

// export const Route = createFileRoute("/admin/patients")({
//   head: () => ({ meta: [{ title: "Patients — Admin — DoctorSheba" }] }),
//   component: AdminPatients,
// });

const BG: Record<string, string> = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A−",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B−",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O−",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB−",
};
const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
const PAGE_SIZE = 8;

const AdminPatients = () => {
  const [q, setQ] = React.useState("");
  const [patients, setPatients] = React.useState<PatientRecord[]>(PATIENTS);
  const [statusFilter, setStatusFilter] = React.useState("");
  const [view, setView] = React.useState<Patient | null>(null);
  const [toggle, setToggle] = React.useState("ACTIVE");

  const doToggle = () => {
    if (!toggle) return;
    const next = toggle === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    // setPatients((prev) => prev.map((p) => p.id === toggle.id ? { ...p, status: next } : p));
    toast.success(next === "BLOCKED" ? "Patient blocked" : "Patient unblocked");
  };

  return (
    <>
      <DashboardHeader
        title="Patients"
        description="Manage registered patient accounts."
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patients…"
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
          <option value="">All</option>
          <option value="ACTIVE">Active</option>
          <option value="BLOCKED">Blocked</option>
        </select>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Patient</th>
              <th className="px-4 py-3 text-left font-medium">Age / Gender</th>
              <th className="px-4 py-3 text-left font-medium">Blood</th>
              <th className="px-4 py-3 text-left font-medium">Contact</th>
              <th className="px-4 py-3 text-left font-medium">Last visit</th>
              <th className="px-4 py-3 text-right font-medium">Visits</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-surface/60">
                <td className="px-4 py-3">
                  <button
                    onClick={() => {}}
                    className="flex items-center gap-3 text-left"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-secondary-soft text-sm font-semibold text-secondary">
                      {p.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-foreground hover:text-primary hover:underline">
                        {p.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{p.email}</p>
                    </div>
                  </button>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {p.age} · {p.gender === "MALE" ? "M" : "F"}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-md bg-destructive-soft px-2 py-0.5 text-xs font-medium text-destructive">
                    {BG[p.bloodGroup]}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {p.contactNumber}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {fmt(p.lastVisit)}
                </td>
                <td className="px-4 py-3 text-right font-medium">
                  {p.totalVisits}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={p.status} />
                </td>
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
                      <DropdownMenuItem
                        className={
                          p.status === "ACTIVE" ? "text-destructive" : ""
                        }
                        onClick={() => {}}
                      >
                        <Power className="h-4 w-4" />
                        {p.status === "ACTIVE" ? "Block" : "Unblock"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  No patients match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* <InfoDialog open={!!view} onOpenChange={(o) => !o && setView(null)} title={view?.name || "Patient"}> */}
      {/* {view && (
          <div className="space-y-2 text-sm">
            {([
              ["Email", view.email], ["Phone", view.contactNumber],
              ["Age / Gender", `${""} · ${""}`],
              ["Blood group", "BG[view.bloodGroup]]", ["Address", "view.address"],
              ["Last visit", fmt("view.lastVisit")], ["Total visits", String("view.totalVisits")],
              ["Status", "view.status"],
            ] as const).map(([k, v]) => (
              <div key={k} className="flex justify-between rounded-md border border-border px-3 py-2">
                <span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        )} */}
      {/* </InfoDialog> */}

      {/* <ConfirmDialog open={!!toggle} onOpenChange={(o) => !o && setToggle(null)}
        title={toggle?.status === "ACTIVE" ? "Block this patient?" : "Unblock this patient?"}
        description={toggle?.name} destructive={toggle?.status === "ACTIVE"}
        confirmLabel={toggle?.status === "ACTIVE" ? "Block" : "Unblock"} onConfirm={doToggle}
      /> */}
    </>
  );
};

export default AdminPatients;
