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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { User } from "@/types/user";
import { activatedDashboard } from "@/constants/public/user";
import Link from "next/link";
import { EmptyState } from "@/components/shared/PageState";
import { useRouter } from "next/navigation";
import StatCard from "@/components/shared/StatCard";
import {
  APPOINTMENTS,
  MEDICAL_REPORTS,
  PATIENT_HEALTH_DEMO,
  PAYMENTS,
  PRESCRIPTIONS,
} from "@/constants/patient/data";
import { Badge, StatusBadge } from "@/components/ui/badge";

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
  const router = useRouter();

  const user: User = activatedDashboard;

  const hanldeEmptyState = () => {
    router.push("/doctors");
  };

  const myUpcoming = APPOINTMENTS.filter(
    (a) => a.status === "SCHEDULED" || a.status === "INPROGRESS",
  )
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))
    .slice(0, 4);
  const recentRx = PRESCRIPTIONS.slice(0, 3);
  const recentReports = MEDICAL_REPORTS.slice(0, 4);
  const next = myUpcoming[0];

  const totalSpent = PAYMENTS.filter((p) => p.status === "PAID").reduce(
    (s, p) => s + p.amount,
    0,
  );
  const pendingAmt = PAYMENTS.filter((p) => p.status === "UNPAID").reduce(
    (s, p) => s + p.amount,
    0,
  );

  return (
    <>
      <DashboardHeader
        title={`Welcome${user?.email ? `, ${user.email}` : ""}`}
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Calendar}
          label="Upcoming"
          value={myUpcoming.length}
          tone="primary"
          hint="Next 7 days"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed visits"
          value={APPOINTMENTS.filter((a) => a.status === "COMPLETED").length}
          tone="success"
          trend={12}
        />
        <StatCard
          icon={Wallet2}
          label="Pending payments"
          value={`৳${pendingAmt.toLocaleString()}`}
          tone="warning"
          hint="1 invoice"
        />
        <StatCard
          icon={FileText}
          label="Saved reports"
          value={recentReports.length}
          tone="info"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Next appointment hero */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
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
          {next ? (
            <div className="mt-4 overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary-soft/60 to-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {next.doctorName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {next.specialty} · {next.reason}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-primary" />
                        {fmtDate(next.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-primary" />
                        {next.startTime} – {next.endTime}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        {next.mode === "VIDEO" ? (
                          <Video className="h-4 w-4 text-primary" />
                        ) : (
                          <MapPin className="h-4 w-4 text-primary" />
                        )}
                        {next.mode === "VIDEO"
                          ? "Video consultation"
                          : "In-person visit"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={next.status} />
                  <Button size="sm">
                    {next.mode === "VIDEO" ? (
                      <>
                        <Video className="h-4 w-4" />
                        Join call
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4" />
                        Get directions
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No upcoming appointments.
            </p>
          )}

          <div className="mt-4 divide-y divide-border rounded-xl border border-border">
            {myUpcoming.slice(1).map((a) => (
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
                      {a.doctorName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {a.specialty} · {fmtDate(a.date)} · {a.startTime}
                    </p>
                  </div>
                </div>
                 <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </section>

        {/* Health summary */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Health summary
            </h2>
            <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success">
              Up to date
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat label="Blood group" value={PATIENT_HEALTH_DEMO.bloodGroup} />
            <Stat label="BMI" value={String(PATIENT_HEALTH_DEMO.bmi)} />
            <Stat label="Height" value={PATIENT_HEALTH_DEMO.height} />
            <Stat label="Weight" value={PATIENT_HEALTH_DEMO.weight} />
          </div>
          <div className="mt-4 rounded-lg border border-warning/30 bg-warning-soft/40 p-3 text-xs text-warning-foreground">
            <p className="font-semibold">Allergies</p>
            <p className="mt-0.5">{PATIENT_HEALTH_DEMO.allergies}</p>
          </div>
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link href="/patient/health-profile">
              <HeartPulse className="h-4 w-4" />
              Update health profile
            </Link>
          </Button>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Visits trend */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Visits over time
            </h2>
            <span className="text-xs text-muted-foreground">Last 6 months</span>
          </div>
          <div className="mt-4">
            {/* <AreaLine data={PATIENT_VISITS_6M.map((d) => ({ label: d.month, value: d.value }))} /> */}
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Total spent (lifetime)
            </span>
            <span className="font-semibold text-foreground">
              ৳{totalSpent.toLocaleString()}
            </span>
          </div>
        </section>

        {/* Health alerts */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-semibold text-foreground">Reminders</h2>
          <ul className="mt-4 space-y-3">
            <Reminder
              icon={Pill}
              tone="primary"
              title="Amlodipine 5mg"
              sub="Daily, 8:00 AM"
            />
            <Reminder
              icon={Bell}
              tone="warning"
              title="Follow-up due"
              sub="With Dr. Saiful Islam in 5 days"
            />
            <Reminder
              icon={Activity}
              tone="success"
              title="BP log"
              sub="Submit weekly readings"
            />
            <Reminder
              icon={Phone}
              tone="info"
              title="Emergency hotline"
              sub="10666 · 24/7"
            />
          </ul>
        </section>
      </div>

      {/* Recent prescriptions */}
      <section className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
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
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {recentRx.map((rx) => (
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
                {rx.doctorName} · {fmtDate(rx.date)}
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

function Reminder({
  icon: Icon,
  tone,
  title,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: "primary" | "warning" | "success" | "info";
  title: string;
  sub: string;
}) {
  const map = {
    primary: "bg-primary-soft text-primary",
    warning: "bg-warning-soft text-warning-foreground",
    success: "bg-success-soft text-success",
    info: "bg-info-soft text-info",
  } as const;
  return (
    <li className="flex items-center gap-3">
      <span
        className={`grid h-9 w-9 place-items-center rounded-lg ${map[tone]}`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{sub}</p>
      </div>
    </li>
  );
}

export default PatientDashboard;
