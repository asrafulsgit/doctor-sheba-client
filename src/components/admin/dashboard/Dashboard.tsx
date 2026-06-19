"use client";
import {
  Users,
  Stethoscope,
  Calendar,
  Wallet2,
  ArrowRight,
  Star,
  Activity,
  UserPlus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ACTIVITY_FEED,
  APPOINTMENTS as appointments,
  PATIENTS as patients,
  PAYMENTS as payments,
  REVENUE_TREND_6M,
  TOP_SPECIALTIES,
} from "@/constants/patient/data";
import { featuredDoctors } from "@/constants/public/doctors";
import DashboardHeader from "@/components/shared/DashboardHeader";
import Link from "next/link";
import StatCard from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/ui/badge";
import HorizantalBar from "@/components/shared/HorizantalBar";

// export const Route = createFileRoute("/admin/dashboard")({
//   head: () => ({ meta: [{ title: "Admin Dashboard — DoctorSheba" }] }),
//   component: AdminHome,
// });

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

const AdminDashboard = () => {
  const APPOINTMENTS = appointments;
  const DOCTORS = featuredDoctors;
  const PATIENTS = patients;
  const PAYMENTS = payments;
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = APPOINTMENTS.filter(
    (a) => a.date.slice(0, 10) === today,
  ).length;
  const monthRevenue = PAYMENTS.filter((p) => p.status === "PAID").reduce(
    (s, p) => s + p.amount,
    0,
  );
  const pending = PAYMENTS.filter((p) => p.status === "UNPAID").length;
  const recent = [...APPOINTMENTS]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 6);

  const donutSegs = [
    {
      label: "Completed",
      value: APPOINTMENTS.filter((a) => a.status === "COMPLETED").length,
      color: "var(--success, #16a34a)",
    },
    {
      label: "Scheduled",
      value: APPOINTMENTS.filter((a) => a.status === "SCHEDULED").length,
      color: "var(--primary, #2563eb)",
    },
    {
      label: "In progress",
      value: APPOINTMENTS.filter((a) => a.status === "INPROGRESS").length,
      color: "var(--warning, #d97706)",
    },
    {
      label: "Cancelled",
      value: APPOINTMENTS.filter((a) => a.status === "CANCELED").length,
      color: "var(--destructive, #dc2626)",
    },
  ];

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          icon={Users}
          label="Total patients"
          value={PATIENTS.length * 124}
          tone="primary"
          trend={9}
        />
        <StatCard
          icon={Stethoscope}
          label="Total doctors"
          value={DOCTORS.length * 31}
          tone="info"
          trend={4}
        />
        <StatCard
          icon={Calendar}
          label="Appointments today"
          value={todayCount}
          tone="secondary"
          trend={12}
        />
        <StatCard
          icon={Wallet2}
          label="Revenue (month)"
          value={`৳${(monthRevenue * 38).toLocaleString()}`}
          tone="success"
          trend={22}
        />
        <StatCard
          icon={AlertCircle}
          label="Pending payments"
          value={pending}
          tone="warning"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Revenue trend
            </h2>
            <span className="text-xs text-muted-foreground">Last 6 months</span>
          </div>
          <div className="mt-4">
            {/* <AreaLine data={REVENUE_TREND_6M.map(d => ({ label: d.month, value: d.value }))} format={(n) => `৳${(n / 1000).toFixed(0)}k`} /> */}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 border-t border-border pt-4 text-sm">
            <Mini
              label="MRR"
              value={`৳${REVENUE_TREND_6M[5].value.toLocaleString()}`}
            />
            <Mini label="ARPU" value="৳1,082" />
            <Mini label="Growth" value="+22%" />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-semibold text-foreground">
            Appointment status
          </h2>
          <div className="mt-4">
            {/* <Donut
              segments={donutSegs}
              centerValue={String(APPOINTMENTS.length)}
              centerLabel="this week"
            /> */}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Recent appointments
            </h2>
            <Link
              href="/admin/appointments"
              className="text-xs font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="ml-0.5 inline h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Patient</th>
                  <th className="px-4 py-2.5 text-left font-medium">Doctor</th>
                  <th className="px-4 py-2.5 text-left font-medium">Date</th>
                  <th className="px-4 py-2.5 text-left font-medium">Status</th>
                  <th className="px-4 py-2.5 text-right font-medium">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recent.map((a) => (
                  <tr key={a.id} className="hover:bg-surface/60">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {a.patientName}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {a.doctorName}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {fmt(a.date)} · {a.startTime}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      ৳{a.fee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-semibold text-foreground">
            Top specialties
          </h2>
          <div className="mt-4">
            <HorizantalBar
              rows={TOP_SPECIALTIES.map((s) => ({
                label: s.name,
                value: s.appointments,
                sub: `${s.appointments} appts · ${s.share}%`,
              }))}
            />
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <h2 className="text-base font-semibold text-foreground">
            Top performing doctors
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {DOCTORS.slice(0, 4).map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {d.name.split(" ").slice(-1)[0][0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {d.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {d?.specialties && d?.specialties[0]?.title}
                  </p>
                </div>
                <div className="text-right">
                  <p className="inline-flex items-center gap-0.5 text-sm font-semibold text-warning-foreground">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {d.averageRating}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {d.experience}+ yrs
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-semibold text-foreground">
            Activity feed
          </h2>
          <ul className="mt-4 space-y-3">
            {ACTIVITY_FEED.map((a) => {
              const tone =
                a.tone === "success"
                  ? "bg-success-soft text-success"
                  : a.tone === "warning"
                    ? "bg-warning-soft text-warning-foreground"
                    : "bg-info-soft text-info";
              const Icon =
                a.icon === "user-plus"
                  ? UserPlus
                  : a.icon === "calendar"
                    ? Calendar
                    : a.icon === "wallet"
                      ? Wallet2
                      : a.icon === "star"
                        ? Star
                        : a.icon === "alert"
                          ? AlertCircle
                          : a.icon === "stethoscope"
                            ? Stethoscope
                            : Activity;
              return (
                <li key={a.id} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 grid h-8 w-8 place-items-center rounded-lg ${tone}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm text-foreground">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* System health */}
      <section className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-base font-semibold text-foreground">
          System health
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Health
            label="API uptime"
            value="99.98%"
            tone="success"
            icon={CheckCircle2}
          />
          <Health
            label="Avg response"
            value="184 ms"
            tone="success"
            icon={Activity}
          />
          <Health
            label="Payment gateway"
            value="Operational"
            tone="success"
            icon={CheckCircle2}
          />
          <Health
            label="Open incidents"
            value="0"
            tone="success"
            icon={CheckCircle2}
          />
        </div>
      </section>
    </>
  );
};

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

function Health({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string;
  value: string;
  tone: "success" | "warning" | "destructive";
  icon: React.ComponentType<{ className?: string }>;
}) {
  const map = {
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-foreground",
    destructive: "bg-destructive-soft text-destructive",
  };
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
      <span
        className={`grid h-10 w-10 place-items-center rounded-lg ${map[tone]}`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
