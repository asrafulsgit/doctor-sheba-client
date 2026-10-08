import StatCard from "@/components/shared/StatCard";
import { TrendingUp, Wallet2 } from "lucide-react";

type StatsProps = {
  stats: {
    paidAmount: number;
    unPaidAmount: number;
    currentMonthPaidAmount: number;
  };
};

const Stats = ({ stats }: StatsProps) => {
  return (
    <>
      <StatCard
        icon={Wallet2}
        label="Collected"
        value={`৳${stats.paidAmount}`}
        tone="success"
      />
      <StatCard
        icon={TrendingUp}
        label="Last Month"
        value={`৳${stats.currentMonthPaidAmount}`}
        tone="warning"
      />
      <StatCard
        icon={Wallet2}
        label="Unpaid"
        value={stats.unPaidAmount}
        tone="primary"
      />
    </>
  );
};

export default Stats;
