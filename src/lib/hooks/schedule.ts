import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DoctorAvailableSchedulesFilters,
  queryKeys,
} from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { IDoctor, IDoctorSchedule } from "@/types/doctors";
import { ISchedule } from "@/types/schedule";
import { ScheduleFormValues } from "@/components/admin/schedules/CreateSchedule";

type DoctorSchedules = {
  doctor: IDoctor;
  doctorSchedules: IDoctorSchedule[];
};

// for patient and admin
export function useDoctorSchedules(
  filters: DoctorAvailableSchedulesFilters | {},
  id: string,
) {
  return useQuery({
    queryKey: queryKeys.schedules.doctorSelectedSchedules(filters, id),
    queryFn: () =>
      api<ApiResponse<DoctorSchedules>>(`/doctor-schedule/${id}`, {
        params: filters,
      }),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
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

// for admin
export function useSchedules(filters: DoctorAvailableSchedulesFilters) {
  return useQuery({
    queryKey: queryKeys.schedules.list(filters),
    queryFn: () =>
      api<ApiResponse<ISchedule[]>>("/schedule", {
        params: filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateSchedules() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ScheduleFormValues) => {
      return api("/schedule", {
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
