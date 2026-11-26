import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AppointmentFilters,
  PatientFilters,
  queryKeys,
} from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import {
  IHealthProfile,
  IPatient,
  PatientMetadataResponse,
} from "@/types/patient";
import { IAppointment } from "@/types/appointment";
import { User } from "@/types/user";
import { SinglePatientRecord } from "./UseDoctor";

export function usePatientMetaData() {
  return useQuery({
    queryKey: queryKeys.prescriptions.byPatient(),
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

export function usePatientDetails(id: string) {
  return useQuery({
    queryKey: queryKeys.patients.detail(id),
    queryFn: () => api<ApiResponse<SinglePatientRecord>>(`/patient/${id}`),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

export type Patient = {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  patientHealthData?: IHealthProfile;
  appointments: IAppointment[];
  _count: {
    appointments: number;
  };
  user: User;
};

export function usePatients(filters: PatientFilters = {}) {
  return useQuery({
    queryKey: queryKeys.patients.list(filters),
    queryFn: () => api<ApiResponse<Patient[]>>("/patient", { params: filters }),
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
