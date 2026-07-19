import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MedicalReportFilters, queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { IMedicalReport } from "@/types/medical-report";

export function useMyMedicalReports(filters: MedicalReportFilters = {}) {
  return useQuery({
    queryKey: queryKeys.medicalReports.myMedicalReports(filters),
    queryFn: () =>
      api<ApiResponse<IMedicalReport[]>>("/medical-report/my", {
        params: filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDeleteMedicalReport() {
 const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reportId
    }: {
      reportId: string;
    }) => {
      return api(`/medical-report/${reportId}`, {
        method: "DELETE"
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.medicalReports.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.meta.patientMeta,
      });
    },
  });
}
