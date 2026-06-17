import DashboardHeader from "@/components/shared/DashboardHeader";
import { EmptyState } from "@/components/shared/PageState";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APPOINTMENTS } from "@/constants/patient/data";
import {
  Calendar,
  MapPin,
  MoreHorizontal,
  Stethoscope,
  Video,
} from "lucide-react";

const tabItems = ["upcoming", "completed", "cancelled"] as const;
const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const PatientAppointments = () => {
  const upcoming = APPOINTMENTS.filter(
    (a) => a.status === "SCHEDULED" || a.status === "INPROGRESS",
  );
  const completed = APPOINTMENTS.filter((a) => a.status === "COMPLETED");
  const cancelled = APPOINTMENTS.filter((a) => a.status === "CANCELED");
  return (
    <>
      <DashboardHeader
        title="My Appointments"
        description="Track and manage your visits."
      />
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelled.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          <List items={upcoming} />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <List items={completed} />
        </TabsContent>
        <TabsContent value="cancelled" className="mt-6">
          {cancelled.length ? (
            <List items={cancelled} />
          ) : (
            <EmptyState
              icon={Calendar}
              title="No cancelled appointments"
              description="A clean record."
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

function List({ items }: { items: typeof APPOINTMENTS }) {
  if (!items.length)
    return (
      <EmptyState
        icon={Calendar}
        title="Nothing here yet"
        description="When you have bookings, they'll show up here."
      />
    );
  return (
    <div className="space-y-3">
      {items.map((a) => (
        <div
          key={a.id}
          className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:shadow-elevated"
        >
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-foreground">{a.doctorName}</p>
              <StatusBadge status={a.status} />
              <StatusBadge status={a.paymentStatus} />
            </div>
            <p className="text-sm text-muted-foreground">
              {a.specialty} · {a.reason}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {fmt(a.date)}
              </span>
              <span>
                {a.startTime} – {a.endTime}
              </span>
              <span className="inline-flex items-center gap-1">
                {a.mode === "VIDEO" ? (
                  <Video className="h-3 w-3" />
                ) : (
                  <MapPin className="h-3 w-3" />
                )}
                {a.mode === "VIDEO" ? "Video" : "In-person"}
              </span>
              <span>৳{a.fee}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {a.status === "SCHEDULED" && (
              <Button size="sm" variant="outline">
                Reschedule
              </Button>
            )}
            {(a.status === "SCHEDULED" || a.status === "INPROGRESS") &&
              a.mode === "VIDEO" && (
                <Button size="sm">
                  <Video className="h-4 w-4" />
                  Join
                </Button>
              )}
            <Button size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

// seo optimization
// export const Route = createFileRoute("/patient/appointments")({
//   head: () => ({ meta: [{ title: "My Appointments — DoctorSheba" }] }),
// });

// const tabItems = ["upcoming", "completed", "cancelled"] as const;

// const PatientAppointments = () => {
//   return (
//     <>
//       <DashboardHeader
//         title="My Appointments"
//         description="Track and manage your visits."
//       />
//       <Tabs defaultValue="upcoming">
//         <TabsList>
//           <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//           <TabsTrigger value="completed">Completed</TabsTrigger>
//           <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
//         </TabsList>
//         {tabItems.map((t) => (
//           <TabsContent key={t} value={t} className="mt-6">
//             <EmptyState
//               icon={Calendar}
//               title={`No ${t} appointments`}
//               description="When you book a visit, you'll find it here."
//             />
//           </TabsContent>
//         ))}
//       </Tabs>
//     </>
//   );
// };

export default PatientAppointments;
