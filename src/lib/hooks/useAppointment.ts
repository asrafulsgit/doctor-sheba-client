import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppointmentFilters, queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { AppointmentStatus, IAppointment } from "@/types/appointment";

type Booking = {
  doctorId: string;
  scheduleId: string;
};
export function useBooking() {
  return useMutation({
    mutationFn: (data: Booking) =>
      api<ApiResponse<{ session_url: string | null }>>("/appointment", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}

export function useMyAppointments(filters: AppointmentFilters = {}) {
  return useQuery({
    queryKey: queryKeys.appointments.myAppointmentList(filters),
    queryFn: () =>
      api<ApiResponse<IAppointment[]>>("/appointment/my-appointments", {
        params: filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useMyAppointment(id: string) {
  return useQuery({
    queryKey: queryKeys.appointments.myAppointment(id),
    queryFn: () =>
      api<ApiResponse<IAppointment>>(`/appointment/my-appointment/${id}`),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      appointmentId,
      status,
    }: {
      appointmentId: string;
      status: AppointmentStatus;
    }) => {
      return api(`/appointment/status/${appointmentId}`, {
        method: "PATCH",
        body: JSON.stringify({ id: appointmentId, status }),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.meta.patientMeta,
      });
    },
  });
}
