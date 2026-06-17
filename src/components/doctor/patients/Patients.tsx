import { Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { PATIENTS } from "@/constants/patient/data";

//seo optimization
// export const Route = createFileRoute("/doctor/patients")({
//   head: () => ({ meta: [{ title: "Patient Records — DoctorSheba" }] }),
//   component: DoctorPatients,
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
 

const DoctorPatients = () => {
  return (
    <>
      <DashboardHeader
        title="Patient Records"
        description="All patients you've consulted with."
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone or email…"
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Users className="h-4 w-4" />
          Export
        </Button>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PATIENTS.map((p) => (
              <tr key={p.id} className="hover:bg-surface/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                      {p.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {p.age} · {p.gender === "MALE" ? "Male" : "Female"}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DoctorPatients;
