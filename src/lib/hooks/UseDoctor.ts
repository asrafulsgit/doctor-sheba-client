import { api } from "@/lib/api/api-client";
import { PatientFilters, queryKeys } from "@/lib/query/query-keys";
import { ApiResponse } from "@/types/api-response";
import { IDoctor, IDoctorFilter, IDoctorMeta } from "@/types/doctors";
import { IPatient } from "@/types/patient";
import { IReview } from "@/types/review";
import { useMutation, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";

export function useDoctorMetaData() {
  return useQuery({
    queryKey: queryKeys.doctors.all,
    queryFn: () => api<ApiResponse<IDoctorMeta>>("/meta/doctor"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDoctors(filters: IDoctorFilter = {}) {
  return useQuery({
    queryKey: queryKeys.doctors.list(filters),
    queryFn: () => api<ApiResponse<IDoctor[]>>("/doctor", { params: filters }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDoctorsAdmin(filters: IDoctorFilter = {}) {
  return useQuery({
    queryKey: queryKeys.doctors.adminList(filters),
    queryFn: () => api<ApiResponse<IDoctor[]>>("/doctor/all", { params: filters }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useMyDoctors(filters: IDoctorFilter = {}) {
  return useQuery({
    queryKey: queryKeys.doctors.myDoctorsList(filters),
    queryFn: () =>
      api<ApiResponse<IDoctor[]>>("/doctor/my-doctors", { params: filters }),
    staleTime: 1000 * 60 * 10,
  });
}

type DoctorDetail = {
  doctor: IDoctor;
  reviews: IReview[];
};
export function useDoctorDetails(id: string) {
  return useQuery({
    queryKey: queryKeys.doctors.detail(id),
    queryFn: () => api<ApiResponse<DoctorDetail>>(`/doctor/${id}`),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

export type PatientRecord = {
  lastVisit: string;
  totalVisits: number;
} & IPatient;

export function usePatientRecords(filters: PatientFilters = {}) {
  return useQuery({
    queryKey: queryKeys.patients.list(filters),
    queryFn: () => api<ApiResponse<PatientRecord[]>>(`/doctor/patient-records`),
    staleTime: 1000 * 60 * 5,
  });
}

export type SinglePatientRecord = {
  lastVisit: string;
  totalVisits: number;
  lastConsultant: IDoctor;
} & IPatient;

export function usePatientRecord(id: string) {
  return useQuery({
    queryKey: queryKeys.patients.detail(id),
    queryFn: () =>
      api<ApiResponse<SinglePatientRecord>>(`/doctor/patient-records/${id}`),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

export function useDoctorProfile() {
  return useQuery({
    queryKey: queryKeys.doctors.profile(),
    queryFn: () => api<ApiResponse<IDoctor>>(`/doctor/profile`),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      return api("/doctor", {
        method: "PATCH",
        body: data,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.doctors.all,
      });
    },
  });
}

export function useSuspendOrActivateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; isDelete: boolean }) => {
      return api(`/doctor/${data.id}`, {
        method: "DELETE",
        body: JSON.stringify({ isDelete: data.isDelete }),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.doctors.all,
      });
    },
  });
}
