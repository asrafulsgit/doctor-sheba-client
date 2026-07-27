import StatCard from "@/components/shared/StatCard";
import { Star } from "lucide-react";

type ReviewStatProps = {
  averageRating: number;
  totalReviews: number;
  ratingCounts5Star: number;
};

const ReviewStats = (reviewData : ReviewStatProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        icon={Star}
        label="Average rating"
        value={reviewData.averageRating || 0}
        tone="warning"
      />
      <StatCard
        icon={Star}
        label="Total reviews"
        value={reviewData.totalReviews}
        tone="primary"
      />
      <StatCard
        icon={Star}
        label="5-star share"
        value={`${Math.round((reviewData.ratingCounts5Star / Math.max(reviewData.totalReviews, 1)) * 100) || 0}%`}
        tone="success"
      />
    </div>
  );
};

export default ReviewStats;
