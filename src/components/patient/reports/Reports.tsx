"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { Button } from "@/components/ui/button";
import useQueryManager from "@/hooks/UseQueryManager";
import { useMyMedicalReports } from "@/lib/hooks/useMedicalReport";
import { MedicalReportFilters } from "@/lib/query/query-keys";
import { Upload } from "lucide-react";
import { EmptyState } from "@/components/shared/PageState";
import ReportCard from "./ReportCard";
import ReportSkeleton from "./ReportSkeleton";
import UploadReportForm from "./UploadReportForm";
import { CustomDialog } from "@/hooks/useDialog";
import { useState } from "react";
import ReportGrid from "./ReportGrid";

const PatientReports = () => {
  const [isOpenUploadReport, setIsOpenUploadReport] = useState(false);

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

      <ReportGrid />

      {isOpenUploadReport && (
        <CustomDialog
          open={isOpenUploadReport}
          onOpenChange={setIsOpenUploadReport}
          title="Upload medical report"
        >
          <UploadReportForm onClose={() => setIsOpenUploadReport(false)} />
        </CustomDialog>
      )}
    </>
  );
};

export default PatientReports;
