import DashboardHeader from "@/components/shared/DashboardHeader";
import { Button } from "@/components/ui/button";
import { PRESCRIPTIONS } from "@/constants/patient/data";
import { Calendar, Download, Pill } from "lucide-react";

// seo optimization
// export const Route = createFileRoute("/patient/prescriptions")({
//   head: () => ({ meta: [{ title: "Prescriptions — DoctorSheba" }] }),
//   component: PatientPrescriptions,
// });

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
const PatientPrescriptions = () => {
  return (
    <>
      <DashboardHeader
        title="Prescriptions"
        description="Digital prescriptions from your consultations."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {PRESCRIPTIONS.map((rx) => (
          <article
            key={rx.id}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated"
          >
            <header className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-primary inline-flex items-center gap-1">
                  <Pill className="h-3.5 w-3.5" />
                  Rx
                </p>
                <h3 className="mt-1 text-base font-semibold text-foreground">
                  {rx.diagnosis}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {rx.doctorName} · <Calendar className="inline h-3 w-3" />{" "}
                  {fmt(rx.date)}
                </p>
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4" />
                PDF
              </Button>
            </header>
            <div className="mt-4 divide-y divide-border rounded-lg border border-border">
              {rx.medications.map((m) => (
                <div
                  key={m.name}
                  className="flex items-start justify-between gap-3 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {m.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {m.dosage} · {m.frequency}
                    </p>
                  </div>
                  <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary">
                    {m.duration}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Instructions:</span>{" "}
              {rx.instructions}
            </p>
            {rx.followUpDate && (
              <p className="mt-2 text-xs text-warning-foreground inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Follow-up: {fmt(rx.followUpDate)}
              </p>
            )}
          </article>
        ))}
      </div>
    </>
  );
};

export default PatientPrescriptions;
