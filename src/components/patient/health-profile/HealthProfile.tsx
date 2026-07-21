import DashboardHeader from "@/components/shared/DashboardHeader";
import HealthProfileForm from "./HealthProfileForm";

const PatientHealthProfile = () => {
  return (
    <>
      <DashboardHeader
        title="Health Profile"
        description="Help your doctors give you the best care. All fields are private and encrypted."
      />
      <HealthProfileForm />
    </>
  );
};

export default PatientHealthProfile;