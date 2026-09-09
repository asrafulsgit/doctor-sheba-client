import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PatientFilters, queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { IHealthProfile, IPatient, PatientMetadataResponse } from "@/types/patient";

export function usePatientMetaData() {
  return useQuery({
    queryKey: queryKeys.patients.all,
    queryFn: () => api<ApiResponse<PatientMetadataResponse>>("/meta/patient"),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePatientProfile() {
  return useQuery({
    queryKey: queryKeys.patients.healthProfile(),
    queryFn: () => api<ApiResponse<IPatient>>("/patient/profile"),
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<IPatient> | FormData) => {
      const isFormData = data instanceof FormData;
      return api("/patient", {
        method: "PATCH",
        body: isFormData ? data : JSON.stringify(data),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.patients.all,
      });
    },
  });
}


export type AdminPatient = {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string ;
  contactNumber?: string ;
  address?: string ;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  patientHealthData?: IHealthProfile;
  appointments: Appointment[];
  _count: {
    appointments: number;
  };
}

export interface Appointment {
  schedule: {
    startDateTime: string;
  };
}

export function usePatientsAdmin(filters: PatientFilters = {}) {
  return useQuery({
    queryKey: queryKeys.patients.list(filters),
    queryFn: () => api<ApiResponse<AdminPatient[]>>("/patient", { params: filters }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useSuspendOrActivatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; isDelete: boolean }) => {
      return api(`/patient/${data.id}`, {
        method: "DELETE",
        body: JSON.stringify({ isDelete: data.isDelete }),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.patients.all,
      });
    },
  });
}