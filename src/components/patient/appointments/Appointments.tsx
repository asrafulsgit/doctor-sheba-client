import DashboardHeader from "@/components/shared/DashboardHeader";
import { EmptyState } from "@/components/shared/PageState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";

// seo optimization
// export const Route = createFileRoute("/patient/appointments")({
//   head: () => ({ meta: [{ title: "My Appointments — DoctorSheba" }] }),
// });

const tabItems = ["upcoming", "completed", "cancelled"] as const;

const PatientAppointments = () => {
  return (
    <>
      <DashboardHeader
        title="My Appointments"
        description="Track and manage your visits."
      />
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        {tabItems.map((t) => (
          <TabsContent key={t} value={t} className="mt-6">
            <EmptyState
              icon={Calendar}
              title={`No ${t} appointments`}
              description="When you book a visit, you'll find it here."
            />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default PatientAppointments;
