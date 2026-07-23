import { IReview } from "@/types/review";
import { Star } from "lucide-react";
import React from "react";

const RecentReviews = ({ reviews }: { reviews: IReview[] }) => {
  return (
    <ul className="mt-4 space-y-4">
      {reviews.map((r) => (
        <li
          key={r.id}
          className="rounded-lg border border-border bg-surface p-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">
              {r.patient.name}
            </p>
            <span className="inline-flex items-center gap-0.5 text-xs text-warning-foreground">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">"{r.comment}"</p>
        </li>
      ))}
      {!reviews.length && (
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      )}
    </ul>
  );
};

export default RecentReviews;
