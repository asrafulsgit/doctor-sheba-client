"use client";
import {
  Calendar,
  CheckCircle2,
  Wallet2,
  FileText,
  ArrowRight,
  Stethoscope,
  HeartPulse,
  Clock,
  Video,
  MapPin,
  Pill,
  Bell,
  Activity,
  Phone,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/shared/DashboardHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StatCard from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/ui/badge";
import { useMe } from "@/lib/hooks/useUser";
import { usePatientMetaData } from "@/lib/hooks/usePatient";
import PatientDashboardSkeleton from "./skeleton";
import { UpcomingAppointment } from "@/types/patient";
import { formatBloodGroup } from "@/helpers/formateBloodGroup";
import { format } from "date-fns";
// seo optimization
// export const Route = createFileRoute("/patient/dashboard")({
//   head: () => ({ meta: [{ title: "Patient Dashboard — DoctorSheba" }] }),
//   component: PatientHome,
// });

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

const PatientDashboard = () => {
  const { data, isLoading } = useMe();
  const user = data?.data;
  const { data: metaData, isLoading: metaDataLoading } = usePatientMetaData();

  // console.log(metaData);
  const meta = metaData?.data;
  const stats = meta?.stats;
  const upcomingAppointments: UpcomingAppointment[] =
    meta?.upcomingAppointments || [];
  const healthSummary = meta?.healthSummary;
  const recentPrescriptions = meta?.recentPrescriptions;

  if (metaDataLoading) {
    return <PatientDashboardSkeleton />;
  }

  return (
    <>
      <DashboardHeader
        title={`Welcome, ${user?.name}`}
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
        <StatCard
          icon={Calendar}
          label="Upcoming"
          value={stats?.upcoming || "0"}
          tone="primary"
          hint="Next 7 days"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed visits"
          value={stats?.completedVisits || "0"}
          tone="success"
        />
        <StatCard
          icon={Wallet2}
          label="Pending payments"
          value={stats?.totalPrescriptions || "0"}
          tone="warning"
        />
        <StatCard
          icon={FileText}
          label="Saved reports"
          value={stats?.savedReports || "0"}
          tone="secondary"
        />
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

          {upcomingAppointments.length !== 0 ? (
            <div className="mt-4 divide-y divide-border rounded-xl border border-border">
              {upcomingAppointments?.map((a: any) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between gap-3 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                      <Stethoscope className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {a.doctor.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {a.doctor.designation} ·{" "}
                        {format(
                          new Date(a.schedule.startDateTime),
                          "dd MMM yyyy · hh:mm a",
                        )}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No upcoming appointments.
            </p>
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
            <Stat
              label="Blood group"
              value={formatBloodGroup(healthSummary?.bloodGroup)}
            />
            <Stat label="BMI" value={String(healthSummary?.bmi) || ""} />
            <Stat
              label="Height"
              value={`${healthSummary?.height} meters` || ""}
            />
            <Stat label="Weight" value={`${healthSummary?.weight} kg` || ""} />
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
        {recentPrescriptions?.length !== 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {recentPrescriptions?.map((rx) => (
              <div
                key={rx.id}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <Pill className="h-3.5 w-3.5" />
                  Prescription
                </div>
                <p className="mt-2 line-clamp-2 text-sm font-semibold text-foreground">
                  {rx.diagnosis}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {rx.doctorName} · {format(new Date(rx.date), "dd MMM yyyy")}
                </p>
                <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                  {rx.medications.slice(0, 2).map((m) => (
                    <li key={m.name} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      <span className="text-foreground">{m.name}</span> ·{" "}
                      {m.frequency}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">No prescription.</p>
        )}
      </section>
    </>
  );
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

export default PatientDashboard;
