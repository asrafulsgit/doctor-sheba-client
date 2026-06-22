import { api } from "@/lib/api/api-client";
import { queryKeys } from "@/lib/query/query-keys";
import { ApiResponse } from "@/types/api-response";
import { ISpecialty } from "@/types/specialties";
import { useQuery } from "@tanstack/react-query";

export function useSpecialties() {
  return useQuery({
    queryKey: queryKeys.specialties.list(),
    queryFn: () => api<ApiResponse<ISpecialty[]>>("/specialties"),
    staleTime: 1000 * 60 * 10,
  });
}