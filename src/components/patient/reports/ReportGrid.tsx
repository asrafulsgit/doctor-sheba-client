import useQueryManager from "@/hooks/UseQueryManager";
import { useMyMedicalReports } from "@/lib/hooks/useMedicalReport";
import { MedicalReportFilters } from "@/lib/query/query-keys";
import React from "react";
import ReportSkeleton from "./ReportSkeleton";
import ReportCard from "./ReportCard";
import { EmptyState } from "@/components/shared/PageState";

const ReportGrid = () => {
  const { getAllQueries } = useQueryManager();
  const allQueries: MedicalReportFilters = getAllQueries();
  const { data, isLoading, isError, error } = useMyMedicalReports(allQueries);
  const reports = data?.data ?? [];

  if (isLoading)
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ReportSkeleton />
      </div>
    );

  if (isError || !reports.length) {
    return (
      <EmptyState
        title={isError ? "Unable to load reports" : "No medical reports found"}
        description={
          isError
            ? error.message
            : "When you have medical report, they'll show up here."
        }
        className="mt-2"
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <ReportCard report={report} key={report.id} />
      ))}
    </div>
  );
};

export default ReportGrid;
