import { DoctorCard } from "@/components/shared/DoctorCard";
import { EmptyState } from "@/components/shared/PageState";
import { DoctorCardSkeleton } from "@/components/shared/SkeletonSet";
import useQueryManager from "@/hooks/UseQueryManager";
import { useDoctors } from "@/lib/hooks/UseDoctor";
import { IDoctorFilter } from "@/types/doctors";

const DoctorsGrid = () => {
  const { getAllQueries } = useQueryManager();
  const allQueries: IDoctorFilter = getAllQueries();
  const { data, isLoading, isError, error } = useDoctors(allQueries);
  const doctors = data?.data;

  if (isLoading) {
    return (
      <div className="grid min-h-117.5 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <DoctorCardSkeleton rows={3} />
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title={error ? error.message : "Unable to load doctors"}
        description="try again later"
      />
    );
  }

  if (!doctors?.length) {
    return (
      <EmptyState title="No doctors found" description="try again later" />
    );
  }
  return (
    <div className="grid min-h-117.5 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {doctors?.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorsGrid;
