import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DoctorAvailableSchedulesFilters,
  queryKeys,
} from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { IDoctor, IDoctorSchedule } from "@/types/doctors";
import { ISchedule } from "@/types/schedule";

type DoctorSchedules = {
  doctor: IDoctor;
  doctorSchedules: IDoctorSchedule[];
};

// for patient
export function useDoctorSchedules(id: string) {
  return useQuery({
    queryKey: queryKeys.bookings.doctorSchedules(id),
    queryFn: () => api<ApiResponse<DoctorSchedules>>(`/doctor-schedule/${id}`),
    staleTime: 1000 * 60 * 5,
  });
}

// for doctor (avaliable)
export function useDoctorAvailableSchedules(
  filters: DoctorAvailableSchedulesFilters,
) {
  return useQuery({
    queryKey: queryKeys.schedules.doctorAvailableSchedules(filters),
    queryFn: () =>
      api<ApiResponse<ISchedule[]>>("/doctor-schedule", {
        params: filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
}

export type ScheduledSchedule = {
  isBooked: boolean;
} & ISchedule;

// for doctor (unavailable)
export function useDoctorScheduledSchedules(
  filters: DoctorAvailableSchedulesFilters,
) {
  return useQuery({
    queryKey: queryKeys.schedules.doctorScheduledSchedules(filters),
    queryFn: () =>
      api<ApiResponse<ScheduledSchedule[]>>("/doctor-schedule/scheduled", {
        params: filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateDoctorSchedules() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { schedules: string[] }) => {
      return api("/doctor-schedule", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.schedules.all,
      });
    },
  });
}

export function useDeleteDoctorSchedules() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { schedules: string[] }) => {
      return api("/doctor-schedule", {
        method: "DELETE",
        body: JSON.stringify(data),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.schedules.all,
      });
    },
  });
}
