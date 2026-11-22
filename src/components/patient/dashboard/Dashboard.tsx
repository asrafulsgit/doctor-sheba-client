"use client";
import {
  Calendar,
  Wallet2,
  FileText,
  ArrowRight,
  Stethoscope,
  HeartPulse,
  Pill,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/shared/DashboardHeader";
import Link from "next/link";
import StatCard from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/ui/badge";
import { useMe } from "@/lib/hooks/useUser";
import { usePatientMetaData } from "@/lib/hooks/usePatient";
import PatientDashboardSkeleton from "./skeleton";
import { UpcomingAppointment } from "@/types/patient";
import { formatBloodGroup } from "@/helpers/formateBloodGroup";
import { format } from "date-fns";
import AppointmentItem from "./AppointmentItem";
import HealthSummaryStat from "./HealthSummaryStat";
import PrescriptionCard from "./PrescriptionCard";

const PatientDashboard = () => {
  const { data: userData, isLoading: userLoading } = useMe();

  const { data: metaData, isLoading: metaLoading } = usePatientMetaData();

  const user = userData?.data;
  const meta = metaData?.data;

  const stats = meta?.stats;
  const appointments = meta?.upcomingAppointments ?? [];
  const prescriptions = meta?.recentPrescriptions ?? [];
  const healthSummary = meta?.healthSummary;

  if (userLoading || metaLoading) {
    return <PatientDashboardSkeleton />;
  }

  const dashboardStats = [
    {
      icon: Calendar,
      label: "Upcoming",
      value: stats?.upcoming ?? 0,
      tone: "primary" as const,
      hint: "Next 7 days",
    },
    {
      icon: CheckCircle,
      label: "Completed visits",
      value: stats?.completedVisits ?? 0,
      tone: "success" as const,
    },
    {
      icon: Wallet2,
      label: "Pending payments",
      value: stats?.totalPrescriptions ?? 0,
      tone: "warning" as const,
    },
    {
      icon: FileText,
      label: "Saved reports",
      value: stats?.savedReports ?? 0,
      tone: "secondary" as const,
    },
  ];

  return (
    <>
      <DashboardHeader
        title={`Welcome, ${user?.name ?? "Patient"}`}
        description="Here's a snapshot of your health journey."
        actions={
          <Button asChild>
            <Link href="/doctors">
              <Stethoscope className="h-4 w-4" />
              Book new appointment
            </Link>
          </Button>
        }
      />

      <div className="grid gap-2 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Next appointment */}
        <section className="rounded-2xl border border-border bg-card p-3 sm:p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Next appointment
            </h2>
            <Link
              href="/patient/appointments"
              className="text-xs font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="ml-0.5 inline h-3 w-3" />
            </Link>
          </div>

          {appointments.length > 0 ? (
            <div className="mt-4 rounded-xl border border-border">
              {appointments.map((appointment: UpcomingAppointment) => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="No upcoming appointments." />
          )}
        </section>

        {/* Health summary */}
        <section className="rounded-2xl border border-border bg-card p-3 sm:p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Health summary
            </h2>
            <span
              className="rounded-full bg-primary-soft px-2 py-0.5 text-xs 
            font-medium text-primary"
            >
              Up to date
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <HealthSummaryStat
              label="Blood group"
              value={formatBloodGroup(healthSummary?.bloodGroup) || "N/A"}
            />

            <HealthSummaryStat
              label="BMI"
              value={healthSummary?.bmi?.toString() ?? "N/A"}
            />

            <HealthSummaryStat
              label="Height"
              value={
                healthSummary?.height != null
                  ? `${healthSummary.height} meters`
                  : "N/A"
              }
            />

            <HealthSummaryStat
              label="Weight"
              value={
                healthSummary?.weight != null
                  ? `${healthSummary.weight} kg`
                  : "N/A"
              }
            />
          </div>

          <Button asChild variant="outline" className="mt-4 w-full">
            <Link href="/patient/health-profile">
              <HeartPulse className="h-4 w-4" />
              Update health profile
            </Link>
          </Button>
        </section>
      </div>

      {/* Recent prescriptions */}
      <section className="mt-4 sm:mt-6 rounded-2xl border border-border bg-card p-3 sm:p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Recent prescriptions
          </h2>
          <Link
            href="/patient/prescriptions"
            className="text-xs font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="ml-0.5 inline h-3 w-3" />
          </Link>
        </div>
        {prescriptions.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {prescriptions.map((prescription) => (
              <PrescriptionCard
                key={prescription.id}
                prescription={prescription}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="No prescriptions found." />
        )}
      </section>
    </>
  );
};

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <p className="mt-4 rounded-lg bg-surface px-4 py-6 text-center text-sm text-muted-foreground">
      {message}
    </p>
  );
};

export default PatientDashboard;
