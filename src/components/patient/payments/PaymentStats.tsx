import StatCard from "@/components/shared/StatCard";
import { CreditCard, Wallet2 } from "lucide-react";

type PaymentStats = {
  paid: number;
  due: number;
  transactions: number;
};

const PaymentStats = ({ stats }: { stats: PaymentStats }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        icon={Wallet2}
        label="Total paid"
        value={`৳${stats.paid ?? 0}`}
        tone="success"
      />
      <StatCard
        icon={CreditCard}
        label="Due"
        value={`৳${stats?.due ?? 0}`}
        tone="warning"
      />
      <StatCard
        icon={Wallet2}
        label="Transactions"
        value={`${stats?.transactions ?? 0}`}
        tone="primary"
      />
    </div>
  );
};

export default PaymentStats;
