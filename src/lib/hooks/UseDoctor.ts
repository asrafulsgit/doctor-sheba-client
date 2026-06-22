import { api } from "@/lib/api/api-client";
import { queryKeys } from "@/lib/query/query-keys";
import { ApiResponse } from "@/types/api-response";
import { IDoctor, IDoctorFilter } from "@/types/doctors";
import { useQuery } from "@tanstack/react-query";

export function useDoctors(filters: IDoctorFilter = {}) {
  return useQuery({
    queryKey: queryKeys.doctors.list(filters),
    queryFn: () => api<ApiResponse<IDoctor[]>>("/doctor", { params: filters }),
    staleTime: 1000 * 60 * 5,
  });
}