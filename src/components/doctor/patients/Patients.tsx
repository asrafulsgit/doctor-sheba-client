import DashboardHeader from "@/components/shared/DashboardHeader";
import PatientRecordTable from "./PatientRecordTable";
import PatientsFilter from "./PatientsFilter";

const DoctorPatients = () => {
  return (
    <>
      <DashboardHeader
        title="Patient Records"
        description="All patients you've consulted with."
      />

      <PatientsFilter />

      <PatientRecordTable />
    </>
  );
};

export default DoctorPatients;
