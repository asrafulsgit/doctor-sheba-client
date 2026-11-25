"use client";
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import DashboardHeader from "@/components/shared/DashboardHeader";
import useQueryManager from "@/hooks/UseQueryManager";
import { PaymentFilters, queryKeys } from "@/lib/query/query-keys";
import { useGetRefunds, usePatientPayments } from "@/lib/hooks/usePayment";
import RowSkeleton, {
  StatsSkeleton,
} from "@/components/shared/SkeletonSet";
import PaymentTable from "./PaymentTable";
import { EmptyState } from "@/components/shared/PageState";
import PaymentStats from "./PaymentStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RefundTable from "./RefundTable";

type PaymentTab = "payments" | "refunds";

const PatientPayments = () => {
  const { getAllQueries } = useQueryManager();
  const allQueries: PaymentFilters = getAllQueries();
  const [activeTab, setActiveTab] = useState<PaymentTab>("payments");
  const handleTabChange = (value: string) => {
    if (value !== "payments" && value !== "refunds") {
      return;
    }
    setActiveTab(value);
  };

  return (
    <>
      <DashboardHeader
        title="Payments"
        description="Invoices and transactions for your appointments."
      />
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <PatientPaymentContent filters={allQueries} />
        </TabsContent>

        <TabsContent value="refunds">
          <PatientRefundContent />
        </TabsContent>
      </Tabs>
    </>
  );
};

function PatientPaymentContent({ filters }: { filters: PaymentFilters }) {
  const { data, isLoading, isError, error } = usePatientPayments(filters);
  const payments = data?.data?.payments;
  const meta = data?.data;

  return (
    <>
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatsSkeleton />
        </div>
      ) : (
        <PaymentStats
          stats={{
            paid: meta?.paid || 0,
            due: meta?.due || 0,
            transactions: meta?.transactions || 0,
          }}
        />
      )}

      {/* Table */}
      {isLoading ? (
        <div className="mt-2">
          <RowSkeleton />
        </div>
      ) : payments?.length ? (
        <PaymentTable payments={payments ?? []} />
      ) : (
        <EmptyState
          title="Nothing here yet"
          description={
            isError ? error.message : "When you have payments, they'll show up here."
          }
          className="mt-2"
        />
      )}
    </>
  );
}

function PatientRefundContent() {
  const { data, isLoading, isError, error } = useGetRefunds({});
  const refunds = data?.data;

  if (isLoading) {
    return (
      <div className="mt-2">
        <RowSkeleton />
      </div>
    );
  }

  if (!refunds?.length) {
    return (
      <EmptyState
        title="Nothing here yet"
        description={
          isError ? error.message : "When you have refunds, they'll show up here."
        }
        className="mt-2"
      />
    );
  }

  return <RefundTable refunds={refunds} />;
}

export default PatientPayments;
