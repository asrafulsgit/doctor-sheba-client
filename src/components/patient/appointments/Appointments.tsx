"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import useQueryManager from "@/hooks/UseQueryManager";
import AppointmentTable from "./AppointmentTable";
import { AppointmentFilters } from "@/lib/query/query-keys";
import { useMyAppointments } from "@/lib/hooks/useAppointment";
import RowSkeleton from "@/components/shared/SkeletonSet";
import { EmptyState } from "@/components/shared/PageState";
import { Calendar } from "lucide-react";
import AppointmentFilter from "./AppointmentFilter";

const PatientAppointments = () => {
  const { getAllQueries } = useQueryManager();
  const allQueries: AppointmentFilters = getAllQueries();
  const { data, isLoading, isError, error } = useMyAppointments(allQueries);
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
          icon={Calendar}
          title="Nothing here yet"
          description={
            isError
              ? error.message
              : "When you have bookings, they'll show up here."
          }
          className="mt-2"
        />
      )}
    </>
  );
};

export default PatientAppointments;
