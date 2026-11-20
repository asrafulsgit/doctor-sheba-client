"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import HorizantalBar from "@/components/shared/HorizantalBar";
import useQueryManager from "@/hooks/UseQueryManager";
import { IReviewFilter } from "@/lib/query/query-keys";
import { useMyReviews } from "@/lib/hooks/useReview";
import { EmptyState } from "@/components/shared/PageState";
import ReviewStats from "./ReviewStats";
import ReviewCard from "./ReviewCard";
import ReviewsSkeleton from "./ReivewsSkeleton";

const DoctorReviews = () => {
  const { getAllQueries } = useQueryManager();
  const allQueries: IReviewFilter = getAllQueries();
  const { data, isLoading, isError, error } = useMyReviews(allQueries);
  const reviewData = data?.data;
  const reviews = reviewData?.reviews;
  if (isLoading) return <ReviewsSkeleton />;
  if (!reviewData || isError) {
    return (
      <EmptyState
        title={isError ? "Unable to load reviews" : "Reviews not found"}
        description={
          isError ? error.message : "When you have reviews, they'll show up here."
        }
      />
    );
  }
  return (
    <>
      <DashboardHeader
        title="Reviews"
        description="What your patients are saying."
      />
      <ReviewStats
        averageRating={reviewData.averageRating}
        ratingCounts5Star={reviewData.ratingCounts["5star"]}
        totalReviews={reviewData.totalReviews}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="max-h-72 rounded-2xl border border-border bg-card p-3 sm:p-6 shadow-soft">
          <h2 className="text-base font-semibold text-foreground">
            Rating distribution
          </h2>
          <div className="mt-3">
            <HorizantalBar rows={reviewData.ratingCounts} />
          </div>
        </section>
        <section
          className="rounded-2xl border border-border bg-card p-3 sm:p-6 
        shadow-soft lg:col-span-2 lg:sticky lg:top-6 lg:flex 
        lg:max-h-[calc(100vh-5.5rem)] lg:flex-col"
        >
          <h2 className="text-base font-semibold text-foreground shrink-0">
            All reviews
          </h2>
          <ul className="mt-4 space-y-3 lg:overflow-y-auto lg:pr-1">
            {reviews?.map((r) => (
              <ReviewCard review={r} key={r.id} />
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default DoctorReviews;
