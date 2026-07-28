import StatCard from "@/components/shared/StatCard";
import { TrendingUp, Wallet2, WalletCards } from "lucide-react";

type PaymentStats = {
  last7DaysEarnings: number;
  totalEarnings: number;
  lastMonthEarnings: number;
  totalPaidPayments: number;
};

const EarningStats = ({ meta }: { meta: PaymentStats }) => {
  return (
    <>
      <StatCard
        icon={Wallet2}
        label="7 days earnings"
        value={`৳${meta?.last7DaysEarnings.toLocaleString() || 0}`}
        tone="success"
      />
      <StatCard
        icon={Wallet2}
        label="Last month earnings"
        value={`৳${meta?.lastMonthEarnings.toLocaleString() || 0}`}
        tone="warning"
      />
      <StatCard
        icon={TrendingUp}
        label="Lifetime"
        value={`৳${meta?.totalEarnings.toLocaleString() || 0}`}
        tone="primary"
      />
      <StatCard
        icon={WalletCards}
        label="Consultations"
        value={meta?.totalPaidPayments || 0}
        tone="info"
      />
    </>
  );
};

export default EarningStats;
