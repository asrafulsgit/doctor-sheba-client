"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import AppointmentTable from "./AppointmentTable";
import AppointmentFilter from "@/components/patient/appointments/AppointmentFilter";

const AdminAppointments = () => {
  return (
    <>
      <DashboardHeader
        title="My Appointments"
        description="Track and manage your visits."
      />

      <AppointmentFilter />

      <AppointmentTable />
    </>
  );
};

export default AdminAppointments;
