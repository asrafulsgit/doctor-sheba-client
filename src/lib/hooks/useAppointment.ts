import { useQuery } from "@tanstack/react-query";
import { AppointmentFilters, queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { IAppointment } from "@/types/appointment";

export function useMyAppointments(filters:AppointmentFilters  = {}) {
  return useQuery({
    queryKey: queryKeys.appointments.myAppointmentList(filters),
    queryFn: () => api<ApiResponse<IAppointment[]>>("/appointment/my-appointments", { params: filters }),
    staleTime: 1000 * 60 * 5,
  });
}