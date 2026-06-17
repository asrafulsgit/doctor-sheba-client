 
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
import { APPOINTMENTS, DOCTOR_EARNINGS_6M, REVIEWS } from "@/constants/patient/data";
import { user } from "@/constants/public/user";
import Link from "next/link";
import StatCard from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/ui/badge";

// seo optimization
// export const Route = createFileRoute("/doctor/dashboard")({
//   head: () => ({ meta: [{ title: "Doctor Dashboard — DoctorSheba" }] }),
//   component: DoctorHome,
// });

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

const DoctorDashboard = () => { 
  const doctorId = "doc-001";
  const myAppts = APPOINTMENTS.filter((a) => a.doctorId === doctorId);
  const today = new Date().toISOString().slice(0, 10);
  const todayAppts = myAppts.filter((a) => a.date.slice(0, 10) === today);
  const pending = myAppts.filter((a) => a.status === "SCHEDULED").length;
  const completed = myAppts.filter((a) => a.status === "COMPLETED").length;
  const earnings = myAppts
    .filter((a) => a.paymentStatus === "PAID")
    .reduce((s, a) => s + a.fee, 0);
  const myReviews = REVIEWS.filter((r) => r.doctorId === doctorId);
  const avgRating = myReviews.length
    ? (myReviews.reduce((s, r) => s + r.rating, 0) / myReviews.length).toFixed(
        1,
      )
    : "—";
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Today's patients"
          value={todayAppts.length}
          tone="primary"
          hint={`${todayAppts.filter((a) => a.mode === "VIDEO").length} via video`}
        />
        <StatCard
          icon={Calendar}
          label="Pending appointments"
          value={pending}
          tone="info"
          trend={8}
        />
        <StatCard
          icon={Wallet2}
          label="Total earnings"
          value={`৳${earnings.toLocaleString()}`}
          tone="success"
          trend={18}
          hint="This month"
        />
        <StatCard
          icon={Star}
          label="Average rating"
          value={avgRating}
          tone="warning"
          hint={`${myReviews.length} reviews`}
        />
      </div>

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
          {todayAppts.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No appointments scheduled today.
            </p>
          ) : (
            <ol className="mt-4 space-y-3">
              {todayAppts.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4"
                >
                  <div className="grid h-12 w-14 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                    <div className="text-xs font-medium">
                      {a.startTime.split(":")[0]}
                    </div>
                    <div className="text-[10px] -mt-0.5">
                      {a.startTime.split(":")[1]}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {a.patientName}
                      </p>
                      <StatusBadge status={a.status} />
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {a.reason}
                    </p>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        {a.mode === "VIDEO" ? (
                          <Video className="h-3 w-3" />
                        ) : (
                          <MapPin className="h-3 w-3" />
                        )}
                        {a.mode === "VIDEO" ? "Video" : "In-person"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {a.startTime}–{a.endTime}
                      </span>
                      <span>৳{a.fee}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {a.status === "INPROGRESS" ? (
                      <Button size="sm">
                        <Video className="h-4 w-4" />
                        Resume
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        <ClipboardList className="h-4 w-4" />
                        Open
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>

        {/* Reviews */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Recent reviews
            </h2>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-warning-foreground">
              <Star className="h-4 w-4 fill-current" />
              {avgRating}
            </span>
          </div>
          <ul className="mt-4 space-y-4">
            {myReviews.slice(0, 3).map((r) => (
              <li
                key={r.id}
                className="rounded-lg border border-border bg-surface p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {r.patientName}
                  </p>
                  <span className="inline-flex items-center gap-0.5 text-xs text-warning-foreground">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  "{r.comment}"
                </p>
              </li>
            ))}
            {myReviews.length === 0 && (
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            )}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Weekly appointments
            </h2>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <div className="mt-4">
            {/* <BarChart
              data={APPOINTMENTS_TREND_7D.map((d) => ({
                label: d.day,
                value: d.count,
              }))}
            /> */}
          </div>
        </section>
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Earnings trend
            </h2>
            <TrendingUp className="h-4 w-4 text-success" />
          </div>
          <div className="mt-4">
            {/* <AreaLine
              data={DOCTOR_EARNINGS_6M.map((d) => ({
                label: d.month,
                value: d.value,
              }))} */}
              {/* format={(n) => `৳${(n / 1000).toFixed(0)}k`}
            /> */}
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">This month</span>
            <span className="font-semibold text-foreground">
              ৳
              {DOCTOR_EARNINGS_6M[
                DOCTOR_EARNINGS_6M.length - 1
              ].value.toLocaleString()}
            </span>
          </div>
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
