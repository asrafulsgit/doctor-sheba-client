"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useQueryManager from "@/hooks/UseQueryManager";

import AppointmentTable from "./AppointmentTable";
import { AppointmentFilters } from "@/lib/query/query-keys";
import { useMyAppointments } from "@/lib/hooks/useAppointment"; 
import { Button } from "@/components/ui/button";
import RowSkeleton from "@/components/shared/SkeletonSet";

const PatientAppointments = () => {
  const { setQuery, getQuery, getAllQueries, clearQuery } = useQueryManager();
  const allQueries: AppointmentFilters = getAllQueries();
  const { data, isLoading, isError, error } = useMyAppointments(allQueries);
  const appointments = data?.data;

  const searchQueryHandler = (value: string) => {
    setQuery("searchTerm", value);
  };

  return (
    <>
      <DashboardHeader
        title="My Appointments"
        description="Track and manage your visits."
      />
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 ">
        <Input
          placeholder="Search by name..."
          value={getQuery("searchTerm") ?? ""}
          onChange={(e) => searchQueryHandler(e.target.value)}
        />

        <div className="flex flex-wrap md:flex-nowrap gap-3">
          <Select
            defaultValue={getQuery("status") ?? ""}
            onValueChange={(v) => setQuery("status", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SCHEDULED">Scheduled</SelectItem>
              <SelectItem value="INPROGRESS">Inprogress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELED">Canceled</SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue={getQuery("limit") ?? ""}
            onValueChange={(v) => setQuery("limit", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="150">150</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={clearQuery}>
          Reset Filters
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="mt-2">
          <RowSkeleton />
        </div>
      ) : (
        <AppointmentTable appointments={appointments ?? []} />
      )}
    </>
  );
};

export default PatientAppointments;
