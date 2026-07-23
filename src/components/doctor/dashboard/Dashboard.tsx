"use client";
import {
  Calendar,
  Users,
  Wallet2,
  Star,
  ListChecks,
  ArrowRight,
  Video,
  MapPin,
  Stethoscope,
  Clock,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/shared/DashboardHeader";
import {
  APPOINTMENTS,
  DOCTOR_EARNINGS_6M,
  REVIEWS,
} from "@/constants/patient/data";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/badge";
import { useMe } from "@/lib/hooks/useUser";
import { useDoctorMetaData } from "@/lib/hooks/UseDoctor";
import DashboardStats from "./DashboardStats";
import PatientDashboardSkeleton from "@/components/patient/dashboard/skeleton";
import { format } from "date-fns";
import { LineChartWithTooltip } from "@/components/shared/LineChartWithTooltip";
import TodaysAppointments from "./TodaysAppointments";
import RecentReviews from "./RecentReviews";
import { PieChartWithTooltip } from "@/components/shared/PieChartWithTooltip";

// seo optimization
// export const Route = createFileRoute("/doctor/dashboard")({
//   head: () => ({ meta: [{ title: "Doctor Dashboard — DoctorSheba" }] }),
//   component: DoctorHome,
// });

const DoctorDashboard = () => {
  const { data, isLoading } = useMe();
  const user = data?.data;
  const { data: metaData, isLoading: metaDataLoading } = useDoctorMetaData();
  const meta = metaData?.data;
  const todaysAppointments = meta?.todaysAppointments;
  const stats = {
    pendingAppointmentCount: meta?.pendingAppointmentCount || 0,
    totalPatient: meta?.patientCount || 0,
    averageRating: meta?.averageRating || 0,
    totalRating: meta?.reviewCount || 0,
    todaysAppointment: todaysAppointments?.length || 0,
  };

  const chartData = meta?.last7DaysCompletedAppointments.map((d) => ({
    label: d.day,
    value: d.count,
  }));
  const chartAppointment = meta?.formattedAppointmentStatusDistribution.map(
    (a) => ({
      label: a.status,
      value: a.count,
    }),
  );

  if (metaDataLoading) {
    return <PatientDashboardSkeleton />;
  }
  return (
    <>
      <DashboardHeader
        title={`Good day${user?.email ? `, Dr. ${user.email}` : ""}`}
        description="Your practice at a glance."
        actions={
          <Button asChild variant="outline">
            <Link href="/doctor/schedules">
              <ListChecks className="h-4 w-4" />
              Manage schedule
            </Link>
          </Button>
        }
      />
      <DashboardStats stats={stats} />
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Today's schedule */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Today's schedule
            </h2>
            <Link
              href="/doctor/appointments"
              className="text-xs font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="ml-0.5 inline h-3 w-3" />
            </Link>
          </div>
          <TodaysAppointments appointments={todaysAppointments ?? []} />
        </section>

        {/* Reviews */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Recent reviews
            </h2>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-warning-foreground">
              <Star className="h-4 w-4 fill-current" />
              {stats.averageRating}
            </span>
          </div>
          <RecentReviews reviews={meta?.recentReviews ?? []} />
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <LineChartWithTooltip
            chartProps={{
              header: "Weekly appointments",
              title: "Last 7 days",
              data: chartData || [],
            }}
          />
        </section>
        <section className="shadow-soft">
          <PieChartWithTooltip
            chartProps={{
              header: "Appointments",
              title: "By status",
              data: chartAppointment ?? [],
            }}
          />
        </section>
      </div>

      {/* Quick actions */}
      <section className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-base font-semibold text-foreground">
          Quick actions
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            icon={Calendar}
            label="Appointments"
            to="/doctor/appointments"
          />
          <QuickAction
            icon={Users}
            label="Patient records"
            to="/doctor/patients"
          />
          <QuickAction
            icon={ClipboardList}
            label="Write prescription"
            to="/doctor/prescriptions"
          />
          <QuickAction
            icon={Stethoscope}
            label="Update profile"
            to="/doctor/settings"
          />
        </div>
      </section>
    </>
  );
};

function QuickAction({
  icon: Icon,
  label,
  to,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  to: string;
}) {
  return (
    <Link
      href={to}
      className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-soft"
    >
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
}

export default DoctorDashboard;
