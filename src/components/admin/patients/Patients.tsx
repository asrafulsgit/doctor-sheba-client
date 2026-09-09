import DashboardHeader from "@/components/shared/DashboardHeader";
import PatientRecordTable from "./PatientRecordTable";
import PatientsFilter from "./PatientsFilter";

// export const Route = createFileRoute("/admin/patients")({
//   head: () => ({ meta: [{ title: "Patients — Admin — DoctorSheba" }] }),
//   component: AdminPatients,
// });

const AdminPatients = () => {
  return (
    <>
      <DashboardHeader
        title="Patients"
        description="Manage registered patient accounts."
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <PatientsFilter />
      </div>

      <PatientRecordTable />
    </>
  );
};

export default AdminPatients;
