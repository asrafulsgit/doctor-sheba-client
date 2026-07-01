import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { PatientMetadataResponse } from "@/types/patient";

export function usePatientMetaData() {
  return useQuery({
    queryKey: queryKeys.prescriptions.byPatient(),
    queryFn: () => api<ApiResponse<PatientMetadataResponse>>("/meta/patient"),
    staleTime: 1000 * 60 * 5,
  });
}
