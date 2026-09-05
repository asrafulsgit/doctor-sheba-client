import StatCard from "@/components/shared/StatCard";
import { Calendar, Stethoscope, Users, Wallet2 } from "lucide-react";

type Stats = {
  totalPatients: number;
  totalDoctors: number;
  lastMonthRevenue: number;
  lastMonthAppointments: number;
};

const DashboardStats = ({ stats }: { stats: Stats }) => {
  return (
    <>
      <StatCard
        icon={Users}
        label="Total patients"
        value={stats.totalPatients}
        tone="primary"
      />
      <StatCard
        icon={Stethoscope}
        label="Total doctors"
        value={stats.totalDoctors}
        tone="info"
      />
      <StatCard
        icon={Calendar}
        label="Appointments Last Month"
        value={stats.lastMonthAppointments}
        tone="secondary"
      />
      <StatCard
        icon={Wallet2}
        label="Revenue (month)"
        value={`৳${stats.lastMonthRevenue ?? 0}`}
        tone="success"
      />
    </>
  );
};

export default DashboardStats;
