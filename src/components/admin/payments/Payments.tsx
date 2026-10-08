"use client";
import { Download, MoreHorizontal, Eye, Undo2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfoDialog } from "@/components/shared/FormDialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardHeader from "@/components/shared/DashboardHeader";

import { StatusBadge } from "@/components/ui/badge";
import Stats from "./Stats";
import useQueryManager from "@/hooks/UseQueryManager";
import { PaymentFilters } from "@/lib/query/query-keys";
import { usePayments } from "@/lib/hooks/usePayment";
import EarningsSkeleton from "@/components/doctor/earnings/EarningsSkeleton";
import PaymentTable from "./PaymentTable";
import PaymentsFilter from "./PaymentsFilter";

const AdminPayments = () => {
  const { getAllQueries } = useQueryManager();
  const allQueries: PaymentFilters = getAllQueries();
  const { data, isLoading, isError, error } = usePayments(allQueries);
  const payments = data?.data?.payments;
  const statsData = data?.data?.stats;
  const stats = {
    paidAmount: statsData?.paidAmount ?? 0,
    unPaidAmount: statsData?.unPaidAmount ?? 0,
    currentMonthPaidAmount: statsData?.currentMonthPaidAmount ?? 0,
  };
  if (isLoading) {
    return <EarningsSkeleton />;
  }

  return (
    <>
      <DashboardHeader
        title="Payments"
        description="All transactions across the platform."
        actions={
          <Button variant="outline" onClick={() => {}}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stats stats={stats} />
      </div>
      
      <PaymentsFilter />

      <PaymentTable payments={payments ?? []} error={error} isError={isError} />
    </>
  );
};

export default AdminPayments;
