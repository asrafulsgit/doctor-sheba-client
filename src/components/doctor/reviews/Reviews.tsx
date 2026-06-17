import { Star } from "lucide-react";

import DashboardHeader from "@/components/shared/DashboardHeader";
import { REVIEWS } from "@/constants/patient/data";
import StatCard from "@/components/shared/StatCard";
import HorizantalBar from "@/components/shared/HorizantalBar";

// seo optimization
// export const Route = createFileRoute("/doctor/reviews")({
//   head: () => ({ meta: [{ title: "Reviews — DoctorSheba" }] }),
//   component: DoctorReviews,
// });

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const DoctorReviews = () => {
  const mine = REVIEWS;
  const avg = mine.length
    ? (mine.reduce((s, r) => s + r.rating, 0) / mine.length).toFixed(1)
    : "—";
  const dist = [5, 4, 3, 2, 1].map((stars) => ({
    label: `${stars} ★`,
    value: mine.filter((r) => r.rating === stars).length,
  }));
  return (
    <>
      <DashboardHeader
        title="Reviews"
        description="What your patients are saying."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Star}
          label="Average rating"
          value={avg}
          tone="warning"
        />
        <StatCard
          icon={Star}
          label="Total reviews"
          value={mine.length}
          tone="primary"
        />
        <StatCard
          icon={Star}
          label="5-star share"
          value={`${Math.round((mine.filter((r) => r.rating === 5).length / Math.max(mine.length, 1)) * 100)}%`}
          tone="success"
        />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-semibold text-foreground">
            Rating distribution
          </h2>
          <div className="mt-4">
            <HorizantalBar rows={dist} />
            </div>
        </section>
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <h2 className="text-base font-semibold text-foreground">
            All reviews
          </h2>
          <ul className="mt-4 space-y-3">
            {mine.map((r) => (
              <li
                key={r.id}
                className="rounded-lg border border-border bg-surface p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {r.patientName}
                  </p>
                  <span className="inline-flex items-center gap-0.5 text-warning-foreground">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  "{r.comment}"
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {fmt(r.date)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default DoctorReviews;
