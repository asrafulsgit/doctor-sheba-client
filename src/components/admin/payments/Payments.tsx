"use client";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/shared/DashboardHeader";
import Stats from "./Stats";
import useQueryManager from "@/hooks/UseQueryManager";
import { PaymentFilters } from "@/lib/query/query-keys";
import { useGetRefunds, usePayments } from "@/lib/hooks/usePayment";
import EarningsSkeleton from "@/components/doctor/earnings/EarningsSkeleton";
import PaymentTable from "./PaymentTable";
import PaymentsFilter from "./PaymentsFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/PageState";
import RowSkeleton from "@/components/shared/SkeletonSet";
import RefundTable from "@/components/patient/payments/RefundTable";

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
      />
      <Tabs defaultValue="payments">
        <TabsList>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <div className="grid gap-4 sm:grid-cols-3">
            <Stats stats={stats} />
          </div>

          <PaymentsFilter />

          <PaymentTable
            payments={payments ?? []}
            error={error}
            isError={isError}
          />
        </TabsContent>

        <TabsContent value="refunds">
          <AdminRefundContent />
        </TabsContent>
      </Tabs>
    </>
  );
};

function AdminRefundContent() {
  const { data, isLoading, isError, error } = useGetRefunds({});
  const refunds = data?.data;

  if (isLoading) {
    return (
      <div className="mt-2">
        <RowSkeleton />
      </div>
    );
  }

  if (isError || !refunds?.length) {
    return (
      <EmptyState
        title={isError ? "Unable to load refunds" : "No refunds found"}
        description={
          isError ? error.message : "When you have refunds, they'll show up here."
        }
        className="mt-2"
      />
    );
  }

  return <RefundTable refunds={refunds} />;
}

export default AdminPayments;
