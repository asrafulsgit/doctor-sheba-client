import { api } from "@/lib/api/api-client";
import { queryKeys } from "@/lib/query/query-keys";
import { ApiResponse } from "@/types/api-response";
import { ISpecialty } from "@/types/specialties";
import { useQuery } from "@tanstack/react-query";
import {z} from "zod";


export interface Specialty {
  id: string;
  title: string;
  icon: string;
}
export function useSpecialties() {
  return useQuery({
    queryKey: queryKeys.specialties.list(),
    queryFn: () => api<ApiResponse<Specialty[]>>("/specialties"),
    staleTime: 1000 * 60 * 10,
  });
}