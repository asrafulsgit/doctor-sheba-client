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

export function useMyDoctors(filters: IDoctorFilter = {}) {
  return useQuery({
    queryKey: queryKeys.doctors.myDoctorsList(filters),
    queryFn: () => api<ApiResponse<IDoctor[]>>("/doctor/my-doctors", { params: filters }),
    staleTime: 1000 * 60 * 10,
  });
}

export function useDoctorProfile(id: string) {
  return useQuery({
    queryKey: queryKeys.doctors.detail(id),
    queryFn: () => api<ApiResponse<IDoctor>>(`/doctor/${id}`),
    staleTime: 1000 * 60 * 5,
  });
}