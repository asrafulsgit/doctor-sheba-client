"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { APPOINTMENTS } from "@/constants/patient/data";

import MyDoctorCard from "./MyDoctorCard";
import { useMyDoctors } from "@/lib/hooks/UseDoctor";
import useQueryManager from "@/hooks/UseQueryManager";
import { IDoctorFilter } from "@/types/doctors";
import { EmptyState } from "@/components/shared/PageState";
import { MyDoctorCardSkeleton } from "./MyDoctorCardSkeleton";

// seo optimization
// export const Route = createFileRoute("/patient/doctors")({
//   head: () => ({ meta: [{ title: "My Doctors — DoctorSheba" }] }),
//   component: PatientDoctors,
// });

const PatientMyDoctors = () => {
  const { getQuery, getAllQueries, setQuery } = useQueryManager();
  const allQueries: IDoctorFilter = getAllQueries();
  const searchTerm = getQuery("searchTerm");
  const { data, isLoading, isError, error } = useMyDoctors(allQueries);
  const doctors = data?.data;

  return (
    <>
      <DashboardHeader
        title="My Doctors"
        description="Doctors you have consulted with."
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MyDoctorCardSkeleton />
        </div>
      ) : doctors?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctors?.map((d) => {
            return <MyDoctorCard doctor={d} key={d.id}/>;
          })}
        </div>
      ) : (
        <EmptyState
          title="No doctors match these filters"
          description="Try removing a filter or searching with a different doctor name."
        />
      )}
    </>
  );
};

export default PatientMyDoctors;
