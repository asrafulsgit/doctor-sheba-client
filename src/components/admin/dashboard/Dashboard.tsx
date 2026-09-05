"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import DashboardHeader from "@/components/shared/DashboardHeader";
import Link from "next/link";
import { useAdminMetaData } from "@/lib/hooks/useAdmin";
import PatientDashboardSkeleton from "@/components/patient/dashboard/skeleton";
import DashboardStats from "./DashboardStats";
import { EmptyState } from "@/components/shared/PageState";
import AreaChartLinear from "@/components/shared/AreaChart";
import { PieChartWithTooltip } from "@/components/shared/PieChartWithTooltip";
import RecentAppointmentsTable from "./RecentAppointmentsTable";
import TopDoctors from "./TopDoctors";

// export const Route = createFileRoute("/admin/dashboard")({
//   head: () => ({ meta: [{ title: "Admin Dashboard — DoctorSheba" }] }),
//   component: AdminHome,
// });

const AdminDashboard = () => {
  const {
    data: metaData,
    isLoading: metaDataLoading,
    isError,
    error,
  } = useAdminMetaData();
  const meta = metaData?.data;
  const monthlyRevenue = meta?.monthlyRevenue.map((r) => ({
    label: r.month,
    value: r.revenue,
  }));
  const appointmentsByStatus = meta?.appointmentCountsByStatus.map((a) => ({
    label: a.status,
    value: a.appointments,
  }));
  if (metaDataLoading) {
    return <PatientDashboardSkeleton />;
  }

  if (isError || !meta) {
    return (
      <EmptyState
        title={"Couldn't load admin dashboard"}
        description={
          isError
            ? error.message
            : "The dashboard may have been removed, the link may be incorrect, or there may be a temporary network issue. Please try again later."
        }
      />
    );
  }
 
  return (
    <>
      <DashboardHeader
        title="Platform overview"
        description="Operational metrics across DoctorSheba."
        actions={
          <Button asChild>
            <Link href="/admin/doctors">
              Manage doctors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="space-y-4 sm:space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardStats stats={meta?.stats} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <AreaChartLinear
              chartProps={{
                header: "Revenue trend",
                title: "Last 6 months",
                data: monthlyRevenue ?? [],
              }}
            />
          </section>

          <PieChartWithTooltip
            chartProps={{
              header: "Appointments",
              title: "By status",
              data: appointmentsByStatus ?? [],
            }}
          />
        </div>

        <RecentAppointmentsTable appointments={meta.recentAppointments} />

        <TopDoctors doctors={meta.topPerformingDoctors} />
      </div>
    </>
  );
};

export default AdminDashboard;
