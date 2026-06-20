"use client";
import * as React from "react";
import {
  Wallet2,
  Download,
  TrendingUp,
  MoreHorizontal,
  Eye,
  Undo2,
  Search,
} from "lucide-react";
import { toast } from "sonner";
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
import { PaymentRecord, PAYMENTS } from "@/constants/patient/data";
import DashboardHeader from "@/components/shared/DashboardHeader";
import StatCard from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/ui/badge";

// export const Route = createFileRoute("/admin/payments")({
//   head: () => ({ meta: [{ title: "Payments — Admin — DoctorSheba" }] }),
//   component: AdminPayments,
// });

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const AdminPayments = () => {
  const [q, setQ] = React.useState("");
  const [payments, setPayments] = React.useState<PaymentRecord[]>(PAYMENTS);
  const [view, setView] = React.useState<PaymentRecord | null>(null);
  const [refund, setRefund] = React.useState<PaymentRecord | null>(null);

  const paid = payments
    .filter((p) => p.status === "PAID")
    .reduce((s, p) => s + p.amount, 0);
  const due = payments
    .filter((p) => p.status === "UNPAID")
    .reduce((s, p) => s + p.amount, 0);

  const doRefund = () => {
    if (!refund) return;
    // set((prev) => prev.map((p) => p.id === refund.id ? { ...p, status: "UNPAID", transactionId: `REFUND-${Date.now().toString().slice(-7)}` } : p));
    toast.success("Refund issued");
  };

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
        <StatCard
          icon={Wallet2}
          label="Collected"
          value={`৳${(paid * 38).toLocaleString()}`}
          tone="success"
          trend={22}
        />
        <StatCard
          icon={TrendingUp}
          label="Due"
          value={`৳${(due * 38).toLocaleString()}`}
          tone="warning"
        />
        <StatCard
          icon={Wallet2}
          label="Transactions (today)"
          value={payments.length}
          tone="primary"
        />
      </div>
      <div className="mt-6 mb-3 max-w-md relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by patient, doctor, txn…"
          className="pl-9"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Txn ID</th>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Patient</th>
              <th className="px-4 py-3 text-left font-medium">Doctor</th>
              <th className="px-4 py-3 text-left font-medium">Method</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-surface/60">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {p.transactionId}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {fmt(p.date)}
                </td>
                <td className="px-4 py-3 font-medium text-foreground">
                  {p.patientName}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {p.doctorName}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.method}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  ৳{p.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setView(p)}>
                        <Eye className="h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      {p.status === "PAID" && (
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setRefund(p)}
                        >
                          <Undo2 className="h-4 w-4" />
                          Refund
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InfoDialog
        open={!!view}
        onOpenChange={(o) => !o && setView(null)}
        title="Payment details"
      >
        {view && (
          <div className="space-y-2 text-sm">
            {(
              [
                ["ID", view.id],
                ["Appointment", view.appointmentId],
                ["Patient", view.patientName],
                ["Doctor", view.doctorName],
                ["Method", view.method],
                ["Transaction ID", view.transactionId],
                ["Status", view.status],
                ["Amount", `৳${view.amount}`],
                ["Date", fmt(view.date)],
              ] as const
            ).map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between rounded-md border border-border px-3 py-2"
              >
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        )}
      </InfoDialog>

      <ConfirmDialog
        open={!!refund}
        onOpenChange={(o) => !o && setRefund(null)}
        title="Issue refund?"
        description={
          refund ? `Refund ৳${refund.amount} to ${refund.patientName}` : ""
        }
        confirmLabel="Refund"
        destructive
        onConfirm={doRefund}
      />
    </>
  );
};

export default AdminPayments;
