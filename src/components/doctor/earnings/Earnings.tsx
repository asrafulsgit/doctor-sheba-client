"use client"
import * as React from "react";
import { Wallet2, TrendingUp, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APPOINTMENTS } from "@/constants/patient/data";
import DashboardHeader from "@/components/shared/DashboardHeader";
import StatCard from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/ui/badge";

// export const Route = createFileRoute("/doctor/earnings")({
//   head: () => ({ meta: [{ title: "Earnings — DoctorSheba" }] }),
//   component: DoctorEarnings,
// });

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
const DOCTOR_ID = "doc-001";
const dayIso = (d: Date) => d.toISOString().slice(0, 10);

const DoctorEarnings = () => {
  const [from, setFrom] = React.useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 6);
    return dayIso(d);
  });
  const [to, setTo] = React.useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return dayIso(d);
  });

  const mine = APPOINTMENTS.filter(
    (a) =>
      a.doctorId === DOCTOR_ID &&
      a.date.slice(0, 10) >= from &&
      a.date.slice(0, 10) <= to,
  );
  const paid = mine.filter((a) => a.paymentStatus === "PAID");
  const total = paid.reduce((s, a) => s + a.fee, 0);
  const pending = mine
    .filter((a) => a.paymentStatus === "UNPAID")
    .reduce((s, a) => s + a.fee, 0);

  const exportStatement = () => {
    // downloadCSV(`earnings-${from}-to-${to}.csv`, mine.map((a) => ({
    //   date: a.date, patient: a.patientName, fee: a.fee, status: a.paymentStatus, mode: a.mode,
    // })));
    toast.success("Statement downloaded");
  };

  return (
    <>
      <DashboardHeader
        title="Earnings"
        description="Track your consultation revenue and payouts."
        actions={
          <Button variant="outline" onClick={exportStatement}>
            <Download className="h-4 w-4" />
            Statement
          </Button>
        }
      />
      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div>
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => {
            const d = new Date();
            setTo(dayIso(d));
            d.setMonth(d.getMonth() - 6);
            setFrom(dayIso(d));
          }}
        >
          Last 6 months
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Wallet2}
          label="Filtered earnings"
          value={`৳${total.toLocaleString()}`}
          tone="success"
          trend={18}
        />
        <StatCard
          icon={TrendingUp}
          label="Lifetime"
          value={`৳${(total * 12).toLocaleString()}`}
          tone="primary"
        />
        <StatCard
          icon={Wallet2}
          label="Pending payout"
          value={`৳${pending.toLocaleString()}`}
          tone="warning"
          hint="Next: Friday"
        />
        <StatCard
          icon={Wallet2}
          label="Consultations"
          value={paid.length}
          tone="info"
        />
      </div>
      <section className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Monthly earnings
          </h2>
          <span className="text-xs text-muted-foreground">Last 6 months</span>
        </div>
        <div className="mt-4">
          {/* <AreaLine data={DOCTOR_EARNINGS_6M.map(d => ({ label: d.month, value: d.value }))} format={(n) => `৳${(n / 1000).toFixed(0)}k`} /> */}
        </div>
      </section>
      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Patient</th>
              <th className="px-4 py-3 text-left font-medium">Payment</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mine.map((a) => (
              <tr key={a.id} className="hover:bg-surface/60">
                <td className="px-4 py-3 text-muted-foreground">
                  {fmt(a.date)}
                </td>
                <td className="px-4 py-3 font-medium text-foreground">
                  {a.patientName}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={a.paymentStatus} />
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  ৳{a.fee.toLocaleString()}
                </td>
              </tr>
            ))}
            {mine.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  No consultations in selected range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default DoctorEarnings;
