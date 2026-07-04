import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { IDoctor, IDoctorSchedule } from "@/types/doctors";

type DoctorSchedules = {
    doctor : IDoctor,
    doctorSchedules : IDoctorSchedule[]
};
export function useDoctorSchedules(id: string) {
  return useQuery({
    queryKey: queryKeys.bookings.doctorSchedules(id),
    queryFn: () =>
      api<ApiResponse<DoctorSchedules>>(`/doctor-schedule/${id}`),
    staleTime: 1000 * 60 * 5,
  });
}
