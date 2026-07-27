import { IHealthTip, IHealthTipFilter } from "@/types/health-tips";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IReviewFilter, queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { IReview } from "@/types/review";

type CreateReviewInput = {
  appointmentId: string;
  rating: number;
  comment: string;
};

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateReviewInput) => {
      return api("/review", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reviews.all,
      });
    },
  });
}

type MyReviews = {
  totalReviews: number;
  averageRating: number;
  ratingCounts: {
    "1star": number;
    "2star": number;
    "3star": number;
    "4star": number;
    "5star": number;
  };
  reviews: IReview[];
};

export function useMyReviews(filters: IReviewFilter) {
  return useQuery({
    queryKey: queryKeys.reviews.myReviewlist(filters),
    queryFn: () =>
      api<ApiResponse<MyReviews>>("/review/my-reviews", {
        params: filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
}
