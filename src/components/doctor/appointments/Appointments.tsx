"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import useQueryManager from "@/hooks/UseQueryManager";
import AppointmentTable from "./AppointmentTable";
import { AppointmentFilters } from "@/lib/query/query-keys";
import { useMyAppointments } from "@/lib/hooks/useAppointment";
import RowSkeleton from "@/components/shared/SkeletonSet";
import { EmptyState } from "@/components/shared/PageState";
import { AppointmentStatus } from "@/types/appointment";

import AppointmentFilter from "@/components/patient/appointments/AppointmentFilter";

const DoctorAppointments = () => {
  const { getQuery, getAllQueries } = useQueryManager();

  const allQueries: AppointmentFilters = getAllQueries();
  const { data, isLoading, isError, error } = useMyAppointments({
    status: (getQuery("status") as AppointmentStatus) ?? "SCHEDULED",
    ...allQueries,
  });
  const appointments = data?.data;

  return (
    <>
      <DashboardHeader
        title="My Appointments"
        description="Track and manage your visits."
      />
      {/* Filters */}
      <AppointmentFilter />

      {/* Table */}
      {isLoading ? (
        <div className="mt-2">
          <RowSkeleton />
        </div>
      ) : appointments?.length ? (
        <AppointmentTable appointments={appointments ?? []} />
      ) : (
        <EmptyState
          title="Nothing here yet"
          description={
            isError
              ? error.message
              : "When you have appointments, they'll show up here."
          }
          className="mt-2"
        />
      )}
    </>
  );
};

export default DoctorAppointments;
