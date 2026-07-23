import StatCard from "@/components/shared/StatCard";
import { Calendar, Star, Users, Users2Icon } from "lucide-react";

type Stats = {
  pendingAppointmentCount: number;
  totalPatient: number;
  averageRating: number;
  totalRating: number;
  todaysAppointment: number;
};

const DashboardStats = ({stats} : {stats : Stats}) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={Users}
        label="Today's appointments"
        value={stats.todaysAppointment || 0}
        tone="primary"
      />
      <StatCard
        icon={Calendar}
        label="Pending appointments"
        value={stats.pendingAppointmentCount || 0}
        tone="info"
      />
      <StatCard
        icon={Users2Icon}
        label="Total patient"
        value={stats.totalPatient || 0}
        tone="success"
      />
      <StatCard
        icon={Star}
        label="Average rating"
        value={stats.averageRating || 0}
        tone="warning"
        hint={`${stats.totalRating} reviews`}
      />
    </div>
  );
};

export default DashboardStats;
