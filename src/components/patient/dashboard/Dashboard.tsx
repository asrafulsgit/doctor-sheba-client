"use client";
import {
  Calendar,
  CheckCircle2,
  Wallet2,
  FileText,
  ArrowRight,
  Stethoscope,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { User } from "@/types/user";
import { activatedDashboard } from "@/constants/public/user";
import Link from "next/link";
import { EmptyState } from "@/components/shared/PageState";
import { useRouter } from "next/navigation";

// seo optimization
// export const Route = createFileRoute("/patient/dashboard")({
//   head: () => ({ meta: [{ title: "Patient Dashboard — DoctorSheba" }] }),
//   component: PatientHome,
// });

const stats = [
  {
    icon: Calendar,
    label: "Upcoming",
    value: 0,
    color: "text-primary bg-primary-soft",
  },
  {
    icon: CheckCircle2,
    label: "Completed visits",
    value: 0,
    color: "text-success bg-success-soft",
  },
  {
    icon: Wallet2,
    label: "Pending payments",
    value: 0,
    color: "text-warning-foreground bg-warning-soft",
  },
  {
    icon: FileText,
    label: "Saved reports",
    value: 0,
    color: "text-secondary bg-secondary-soft",
  },
];

const PatientDashboard = () => {
  const router = useRouter();

  const user: User = activatedDashboard;

  const hanldeEmptyState = () => {
    router.push("/doctors");
  };

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
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <div
                className={`grid h-10 w-10 place-items-center rounded-lg ${s.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                {s.value}
              </p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Upcoming appointment
            </h2>
            <Link
              href="/patient/appointments"
              className="text-xs font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="ml-0.5 inline h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4">
            <EmptyState
              icon={Calendar}
              title="No upcoming appointments"
              description="Book your first consultation with a verified doctor."
              actionLabel="Find a doctor"
              onAction={hanldeEmptyState}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-semibold text-foreground">
            Health summary
          </h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-surface px-3 py-2">
              <span className="text-muted-foreground">Blood group</span>
              <span className="font-medium text-foreground">—</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface px-3 py-2">
              <span className="text-muted-foreground">Height / Weight</span>
              <span className="font-medium text-foreground">—</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface px-3 py-2">
              <span className="text-muted-foreground">Allergies</span>
              <span className="font-medium text-foreground">—</span>
            </div>
            <Button asChild variant="outline" className="mt-2 w-full">
              <Link href="/patient/health-profile">
                <HeartPulse className="h-4 w-4" />
                Complete your health profile
              </Link>
            </Button>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-base font-semibold text-foreground">
          Recent prescriptions
        </h2>
        <div className="mt-4">
          <EmptyState
            icon={FileText}
            title="No prescriptions yet"
            description="Prescriptions from your doctors will appear here after completed visits."
          />
        </div>
      </section>
    </>
  );
};

export default PatientDashboard;
