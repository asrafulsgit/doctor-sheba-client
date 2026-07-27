import { getDate } from "@/helpers/getDate";
import { IReview } from "@/types/review";
import { Star } from "lucide-react";
import Image from "next/image";

const ReviewCard = ({review}: { review : IReview}) => {
  return (
    <li
      key={review.id}
      className="rounded-lg border border-border bg-surface p-2.5 sm:p-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-x-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
            {review.patient.profilePhoto ? (
              <Image
                src={review.patient.profilePhoto ?? ""}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
                width={40}
                height={40}
              />
            ) : (
              <span>{review.patient.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">
              {review.patient.name}
            </span>
            <span className="text-sm text-muted-foreground">
              {getDate(review.createdAt, "dd/MM/yyyy")}
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-0.5 text-warning-foreground">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
        </span>
      </div>
      <p className="mt-2 text-muted-foreground">"{review.comment}"</p>
    </li>
  );
};

export default ReviewCard;
