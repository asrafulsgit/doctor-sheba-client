"use client";
import DashboardHeader from "@/components/shared/DashboardHeader"; 
import SchedulesTable from "./SchedulesTable";
import DoctorSchedulesFilter from "./DoctorSchedulesFilter";

const DoctorSchedules = () => {
  return (
    <>
      <DashboardHeader
        title="Schedules"
        description="Doctor selected schedules and time slots."
      />

      <div className="flex gap-3 mb-3">
        <DoctorSchedulesFilter />
      </div>

      <SchedulesTable />
    </>
  );
};

export default DoctorSchedules;
