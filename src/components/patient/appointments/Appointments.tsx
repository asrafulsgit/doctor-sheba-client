import DashboardHeader from "@/components/shared/DashboardHeader";
import AppointmentTable from "./AppointmentTable";
import AppointmentFilter from "./AppointmentFilter";

const PatientAppointments = () => {
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

export default PatientAppointments;
