import DashboardHeader from "@/components/shared/DashboardHeader";
import { Button } from "@/components/ui/button";
import { MEDICAL_REPORTS } from "@/constants/patient/data";
import {
  Download,
  FileText,
  FlaskConical,
  ImageIcon,
  Upload,
} from "lucide-react";

// seo optimization
// export const Route = createFileRoute("/patient/reports")({
//   head: () => ({ meta: [{ title: "Medical Reports — DoctorSheba" }] }),
//   component: PatientReports,
// });

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const ICON = {
  Lab: FlaskConical,
  Imaging: ImageIcon,
  Prescription: FileText,
  Discharge: FileText,
} as const;
const TONE = {
  Lab: "bg-info-soft text-info",
  Imaging: "bg-secondary-soft text-secondary",
  Prescription: "bg-primary-soft text-primary",
  Discharge: "bg-success-soft text-success",
} as const;

const PatientReports = () => {
  return (
    <>
      <DashboardHeader
        title="Medical Reports"
        description="Lab results, imaging and discharge documents in one place."
        actions={
          <Button>
            <Upload className="h-4 w-4" />
            Upload report
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MEDICAL_REPORTS.map((r) => {
          const Icon = ICON[r.type];
          return (
            <div
              key={r.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div
                className={`grid h-11 w-11 place-items-center rounded-lg ${TONE[r.type]}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">
                {r.reportName}
              </p>
              <p className="text-xs text-muted-foreground">
                {r.type} · {r.size}
              </p>
              <p className="text-xs text-muted-foreground">{fmt(r.date)}</p>
              <Button size="sm" variant="outline" className="mt-3 w-full">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PatientReports;
