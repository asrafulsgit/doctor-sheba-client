"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import StatCard from "@/components/shared/StatCard";
import { CreditCard, Download, Wallet2 } from "lucide-react";

import useQueryManager from "@/hooks/UseQueryManager";
import { PaymentFilters } from "@/lib/query/query-keys";
import { usePatientPayments } from "@/lib/hooks/payment";
import RowSkeleton, { StatsSkeleton } from "@/components/shared/SkeletonSet";
import PaymentTable from "./PaymentTable";
import { EmptyState } from "@/components/shared/PageState";
import PaymentStats from "./PaymentStats";

// seo optimization
// export const Route = createFileRoute("/patient/payments")({
//   head: () => ({ meta: [{ title: "Payments — DoctorSheba" }] }),
//   component: PatientPayments,
// });

const PatientPayments = () => {
  const { setQuery, getQuery, getAllQueries, clearQuery } = useQueryManager();
  const allQueries: PaymentFilters = getAllQueries();
  const { data, isLoading, isError, error } = usePatientPayments(allQueries);
  const payments = data?.data?.payments;
  const meta = data?.data;
  return (
    <>
      <DashboardHeader
        title="Payments"
        description="Invoices and transactions for your appointments."
      />
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
            isError
              ? error.message
              : "When you have payments, they'll show up here."
          }
          className="mt-2"
        />
      )}
    </>
  );
};

export default PatientPayments;
