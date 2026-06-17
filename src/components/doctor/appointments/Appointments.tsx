import { Video, MapPin, ClipboardList, Calendar, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { APPOINTMENTS } from "@/constants/patient/data";
import { StatusBadge } from "@/components/ui/badge";

//seo optimization
// export const Route = createFileRoute("/doctor/appointments")({
//   head: () => ({ meta: [{ title: "Appointments — DoctorSheba" }] }),
//   component: DoctorAppointments,
// });

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

const DoctorAppointments = () => {
  const today = new Date().toISOString().slice(0, 10);
  const mine = APPOINTMENTS.filter((a) => a.doctorId === "doc-001");
  const tabs = {
    today: mine.filter((a) => a.date.slice(0, 10) === today),
    upcoming: mine.filter(
      (a) => a.status === "SCHEDULED" && a.date.slice(0, 10) !== today,
    ),
    completed: mine.filter((a) => a.status === "COMPLETED"),
    cancelled: mine.filter((a) => a.status === "CANCELED"),
  };
  return (
    <>
      <DashboardHeader
        title="Appointments"
        description="Accept, complete or reschedule patient visits."
      />
      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today ({tabs.today.length})</TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming ({tabs.upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({tabs.completed.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({tabs.cancelled.length})
          </TabsTrigger>
        </TabsList>
        {(Object.keys(tabs) as Array<keyof typeof tabs>).map((k) => (
          <TabsContent key={k} value={k} className="mt-6">
            <Table items={tabs[k]} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

function Table({ items }: { items: typeof APPOINTMENTS }) {
  if (!items.length)
    return (
      <p className="rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center text-sm text-muted-foreground">
        No appointments.
      </p>
    );
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-surface text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Patient</th>
            <th className="px-4 py-3 text-left font-medium">Reason</th>
            <th className="px-4 py-3 text-left font-medium">Date / time</th>
            <th className="px-4 py-3 text-left font-medium">Mode</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((a) => (
            <tr key={a.id} className="hover:bg-surface/60">
              <td className="px-4 py-3 font-medium text-foreground">
                {a.patientName}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{a.reason}</td>
              <td className="px-4 py-3 text-muted-foreground">
                <Calendar className="inline h-3 w-3" /> {fmt(a.date)} ·{" "}
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
              <td className="px-4 py-3 text-right">
                {a.status === "INPROGRESS" ? (
                  <Button size="sm">Resume</Button>
                ) : a.status === "SCHEDULED" ? (
                  <Button size="sm" variant="outline">
                    <ClipboardList className="h-4 w-4" />
                    Open
                  </Button>
                ) : (
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorAppointments;
