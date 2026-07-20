"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { Button } from "@/components/ui/button";
import useQueryManager from "@/hooks/UseQueryManager";
import { useMyMedicalReports } from "@/lib/hooks/useMedicalReport";
import { MedicalReportFilters } from "@/lib/query/query-keys";
import { Upload } from "lucide-react";
import RowSkeleton from "@/components/shared/SkeletonSet";
import { EmptyState } from "@/components/shared/PageState";
import ReportCard from "./ReportCard";
import ReportSkeleton from "./ReportSkeleton";
import UploadReportForm from "./UploadReportForm";
import { CustomDialog } from "@/hooks/useDialog";
import { useState } from "react";

// seo optimization
// export const Route = createFileRoute("/patient/reports")({
//   head: () => ({ meta: [{ title: "Medical Reports — DoctorSheba" }] }),
//   component: PatientReports,
// });

const PatientReports = () => {
  const [isOpenUploadReport, setIsOpenUploadReport] = useState(false);

  const { setQuery, getQuery, getAllQueries, clearQuery } = useQueryManager();
  const allQueries: MedicalReportFilters = getAllQueries();
  const { data, isLoading, isError, error } = useMyMedicalReports(allQueries);
  const reports = data?.data;
  return (
    <>
      <DashboardHeader
        title="Medical Reports"
        description="Lab results, imaging and discharge documents in one place."
        actions={
          <Button onClick={() => setIsOpenUploadReport(true)}>
            <Upload className="h-4 w-4" />
            Upload report
          </Button>
        }
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ReportSkeleton />
        </div>
      ) : reports?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <ReportCard report={report} key={report.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nothing here yet"
          description={
            isError
              ? error.message
              : "When you have medical report, they'll show up here."
          }
          className="mt-2"
        />
      )}

      {isOpenUploadReport && <CustomDialog
        open={isOpenUploadReport}
        onOpenChange={setIsOpenUploadReport}
        title="Upload medical report"
      >
        <UploadReportForm onClose={()=>setIsOpenUploadReport(false)}/>
      </CustomDialog>}
    </>
  );
};

export default PatientReports;
