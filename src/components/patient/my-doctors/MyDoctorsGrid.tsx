import useQueryManager from "@/hooks/UseQueryManager";
import { useMyDoctors } from "@/lib/hooks/UseDoctor";
import { IDoctorFilter } from "@/types/doctors";
import React from "react";
import { MyDoctorCardSkeleton } from "./MyDoctorCardSkeleton";
import { EmptyState } from "@/components/shared/PageState";
import MyDoctorCard from "./MyDoctorCard";

const MyDoctorsGrid = () => {
  const { getAllQueries } = useQueryManager();
  const allQueries: IDoctorFilter = getAllQueries();
  const { data, isLoading, isError, error } = useMyDoctors(allQueries);
  const doctors = data?.data ?? [];

  if (isLoading)
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MyDoctorCardSkeleton />
      </div>
    );

  if (isError || !doctors.length) {
    return (
      <EmptyState
        title={
          isError ? "Unable to load doctors" : "No doctors match these filters"
        }
        description={
          isError
            ? error.message
            : "Try removing a filter or searching with a different doctor name."
        }
      />
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {doctors?.map((d) => {
        return <MyDoctorCard doctor={d} key={d.id} />;
      })}
    </div>
  );
};

export default MyDoctorsGrid;
