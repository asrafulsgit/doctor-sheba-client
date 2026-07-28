"use client";
import { Wallet2, TrendingUp, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APPOINTMENTS } from "@/constants/patient/data";
import DashboardHeader from "@/components/shared/DashboardHeader";
import StatCard from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/ui/badge";
import useQueryManager from "@/hooks/UseQueryManager";
import { PaymentFilters } from "@/lib/query/query-keys";
import { useMyEarnings } from "@/lib/hooks/usePayment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { getDate } from "@/helpers/getDate";
import { useState } from "react";
import AreaChartLinear from "@/components/shared/AreaChart";
import RowSkeleton from "@/components/shared/SkeletonSet";
import PaymentTable from "./PaymentTable";
import { EmptyState } from "@/components/shared/PageState";
import EarningStats from "./EarningStats";
import EarningsSkeleton from "./EarningsSkeleton";

// export const Route = createFileRoute("/doctor/earnings")({
//   head: () => ({ meta: [{ title: "Earnings — DoctorSheba" }] }),
//   component: DoctorEarnings,
// });

const DoctorEarnings = () => {
  const { setQuery, getQuery, getAllQueries, clearQuery } = useQueryManager();

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const allQueries: PaymentFilters = getAllQueries();
  const { data, isLoading, isError, error } = useMyEarnings(allQueries);
  const payments = data?.data?.payments;
  const meta = data?.data;

  if (isLoading) return <EarningsSkeleton />;

  return (
    <>
      <DashboardHeader
        title="Earnings"
        description="Track your consultation revenue and payouts."
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Statement
          </Button>
        }
      />
      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div>
          <Label htmlFor="from">From</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-muted-foreground">
                {getDate(startDate, "dd-MM-yyyy")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-62">
              <Calendar
                mode="single"
                defaultMonth={startDate}
                selected={startDate}
                onSelect={(selectedDate) => {
                  setQuery("startDate", getDate(selectedDate, "yyyy-MM-dd"));
                  setStartDate(selectedDate);
                }}
                showWeekNumber
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Label htmlFor="to">To</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-muted-foreground">
                {getDate(endDate, "dd-MM-yyyy")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-62">
              <Calendar
                mode="single"
                defaultMonth={endDate}
                selected={endDate}
                onSelect={(selectedDate) => {
                  setQuery("endDate", getDate(selectedDate, "yyyy-MM-dd"));
                  setEndDate(selectedDate);
                }}
                disabled={startDate ? { before: startDate } : undefined}
                showWeekNumber
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <EarningStats
          meta={{
            last7DaysEarnings: meta?.last7DaysEarnings || 0,
            totalEarnings: meta?.totalEarnings || 0,
            lastMonthEarnings: meta?.lastMonthEarnings || 0,
            totalPaidPayments: meta?.totalPaidPayments || 0,
          }}
        />
      </div>
      <section className="my-4 bg-card shadow-soft">
        <AreaChartLinear
          chartProps={{
            header: "Monthly earnings",
            title: "Last 6 months",
            data: meta?.last6MonthsEarningsChart ?? [],
          }}
        />
      </section>
      {/* Table */}
      {payments?.length ? (
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

export default DoctorEarnings;
