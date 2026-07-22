import DashboardHeader from "@/components/shared/DashboardHeader";
import ProfileSettingForm from "./ProfileSettingForm";
import ChangePasswordSettingForm from "./ChangePasswordSettingForm";

const PatientSettings = () => {
  return (
    <>
      <DashboardHeader
        title="Settings"
        description="Account, security and notifications."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <ProfileSettingForm />
        <ChangePasswordSettingForm />
      </div>
    </>
  );
};

export default PatientSettings;
