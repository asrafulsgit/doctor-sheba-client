import RowSkeleton, {
  DashBoardHeaderSkeleton,
} from "@/components/shared/SkeletonSet";
import { Skeleton } from "@/components/ui/skeleton";

const AppointmnetSkeleton = () => {
  return (
    <>
      {/* Header */}
      <DashBoardHeaderSkeleton />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 my-2">
        <Skeleton className="h-9 w-full" />
        <div className="flex flex-wrap sm:flex-nowrap gap-3">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-22" />
        </div>
      </div>

      {/* Table */}
      <RowSkeleton />

      {/* Pagination */}
      {/* <PaginationSkeleton /> */}
    </>
  );
};

export default AppointmnetSkeleton;
