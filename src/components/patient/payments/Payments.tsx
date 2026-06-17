import DashboardHeader from '@/components/shared/DashboardHeader'
import StatCard from '@/components/shared/StatCard';
import { StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PAYMENTS } from '@/constants/patient/data';
import { CreditCard, Download, Wallet2 } from 'lucide-react';

// seo optimization
// export const Route = createFileRoute("/patient/payments")({
//   head: () => ({ meta: [{ title: "Payments — DoctorSheba" }] }),
//   component: PatientPayments,
// });

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const PatientPayments = () => {
    const paid = PAYMENTS.filter(p => p.status === "PAID").reduce((s, p) => s + p.amount, 0);
  const due = PAYMENTS.filter(p => p.status === "UNPAID").reduce((s, p) => s + p.amount, 0);
  return (
    <>
    <DashboardHeader title="Payments" description="Invoices and transactions for your appointments." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Wallet2} label="Total paid" value={`৳${paid.toLocaleString()}`} tone="success" />
        <StatCard icon={CreditCard} label="Due" value={`৳${due.toLocaleString()}`} tone="warning" />
        <StatCard icon={Wallet2} label="Transactions" value={PAYMENTS.length} tone="primary" />
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-surface text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Doctor</th>
              <th className="px-4 py-3 text-left font-medium">Method</th>
              <th className="px-4 py-3 text-left font-medium">Transaction ID</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Amount</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PAYMENTS.map(p => (
              <tr key={p.id} className="hover:bg-surface/60">
                <td className="px-4 py-3 text-muted-foreground">{fmt(p.date)}</td>
                <td className="px-4 py-3 font-medium text-foreground">{p.doctorName}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.method}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.transactionId}</td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                <td className="px-4 py-3 text-right font-semibold text-foreground">৳{p.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">
                  {p.status === "PAID" ? (
                    <Button size="sm" variant="ghost"><Download className="h-4 w-4" />Invoice</Button>
                  ) : (
                    <Button size="sm">Pay now</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PatientPayments
