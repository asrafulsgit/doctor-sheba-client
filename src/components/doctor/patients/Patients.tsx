"use client";
import { Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/shared/DashboardHeader";
import useQueryManager from "@/hooks/UseQueryManager";
import { PatientFilters } from "@/lib/query/query-keys";
import { usePatientRecords } from "@/lib/hooks/UseDoctor";
import RowSkeleton from "@/components/shared/SkeletonSet";
import { EmptyState } from "@/components/shared/PageState";
import PatientRecordTable from "./PatientRecordTable";

//seo optimization
// export const Route = createFileRoute("/doctor/patients")({
//   head: () => ({ meta: [{ title: "Patient Records — DoctorSheba" }] }),
//   component: DoctorPatients,
// });

const DoctorPatients = () => {
  const { getQuery, getAllQueries } = useQueryManager();
  const allQueries: PatientFilters = getAllQueries();
  const { data, isLoading, isError, error } = usePatientRecords(allQueries);
  const patients = data?.data;
   
  return (
    <>
      <DashboardHeader
        title="Patient Records"
        description="All patients you've consulted with."
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative max-w-full flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone or email…"
            className="pl-9"
          />
        </div>
        <Button variant="outline">
          <Users className="h-4 w-4" />
          Export
        </Button>
      </div>
      {/* Table */}
      {isLoading ? (
        <div className="mt-2">
          <RowSkeleton />
        </div>
      ) : patients?.length ? (
        <PatientRecordTable patients={patients ?? []} />
      ) : (
        <EmptyState
          title="Nothing here yet"
          description={
            isError
              ? error.message
              : "When you have patients, they'll show up here."
          }
          className="mt-2"
        />
      )}
    </>
  );
};

export default DoctorPatients;
